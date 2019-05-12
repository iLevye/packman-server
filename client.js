#!/usr/bin/env node
var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(data) {
        if (data.type === 'utf8') {
            console.log("Received: '" + data.utf8Data + "'");

            try{
                var data = JSON.parse(data.utf8Data);

                switch(Number(data.c)){
                  case 0://login
                    
                      connection.sendUTF(JSON.stringify({c:0,u:"idzaki"}));
                      console.log("username sent: ");

                  break;

                  case 1://map
                      connection.sendUTF(JSON.stringify({c:1,d:2}));//go right

                  break;
                }
              }catch(error) {
                console.error(error);
              }

        }
    });
    
    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    // sendNumber();
});

client.connect('ws://localhost:3333/');