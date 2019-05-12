var WebSocketServer = require('websocket').server;
var http = require('http');
var Player = require('./engine/player');
var Map = require('./engine/map');
// global.mapObjects = require('./engine/mapobjects');



var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});

process.title = 'Packman-Server';

const port = 3333;
var clients = [];
var players = [];
global.config = {timers:{updatePositions:500},screen:{width:9,height:13}};
global.game = {map: new Map('test')};
var updatePositionsTimer = null; 

server.listen(port, function() {
  console.log("Packman Server is Started from port " + port + "\n\n");
}).on('error', console.log);

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});


const update = ()=>{
  for(var k in players){
    // console.log('move check');
    players[k].move();

      // if(players[k].direction > 0){ //it's moving

      // }
  }
  sendObjects();

}


async function sendObjects(){
  for(var k in players){
    // console.log('move check');
    // players[k].move();

      // if(players[k].direction > 0){ //it's moving

      // }
  }
}

updatePositionsTimer = setInterval(update,config.timers.updatePositions);


// WebSocket server
wsServer.on('request', function(request) {
  
  // console.log('request: ', request);



  var connection = request.accept(null, request.origin);

  // console.log('connection: ', connection);
  var connectionIndex = clients.push(connection) - 1;
  var playerIndex = -1;


  connection.sendUTF('{"c":0}');

  // connection.sendUTF('{"c":0,"m":"hello client"}');

  console.log('Connection from origin ' + request.origin + ' ConnectionIndex: ' + connectionIndex);



            // JSON.stringify({ type:'color', data: userColor })
        // console.log((new Date()) + ' User is known as: ' + userName
                    // + ' with ' + userColor + ' color.');


  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(data) {
    if (data.type === 'utf8') {
      console.log('data: ',data.utf8Data);

      try{
        var data = JSON.parse(data.utf8Data);

        switch(Number(data.c)){
          case 0://login
            if(Number(playerIndex) == -1){
              playerIndex = players.push(new Player(connectionIndex,data.u)) -1;
              console.log("playerIndex: ",playerIndex);

              connection.sendUTF(JSON.stringify({c:1,d:game.map.data}));
              console.log("Map sent to: ",playerIndex);
            }
          break;

          case 1://direction
              players[playerIndex].direction = data.d;
          break;
        }
      }catch(error) {
        console.error(error);
      }



      // process WebSocket message
    }
  });

  connection.on('close', function(connection) {
    console.log(connection);
      clients.splice(connectionIndex, 1);
      players.splice(playerIndex, 1);
      console.log('close: '+ connection.remoteAddress + " disconnected. connectionIndex: " + connectionIndex);
    // close user connection
  });
});