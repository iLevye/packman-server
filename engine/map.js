mapObjects = require('./mapobjects');

class Map {
  constructor(mapName) {
    this.data = require('../maps/'+mapName+'.map');
    this.width = this.data.length;
    this.height = this.data[0].length;
    console.log("Map size is: " + this.width + " x " + this.height);
    this.objectCoordinates = [];
    for (var x in this.data){
    	this.objectCoordinates.push([]);
    	for (var y in this.data[x]){
    		this.objectCoordinates[x].push({});
    	}
    };
    // console.log(this.objectCoordinates);
    console.log("Map "+mapName+" is loaded");
  }

  walkable(x,y){
  	const nObject = global.mapObjects[this.data[x][y]];
  	console.log('nObject: '+ nObject);
  	return nObject[1];
  }

  getObjects(x,y){
  	minX = ((config.screen.width-1)/2);
  	maxX = this.width - minX;
  	if(x < minX){
  		x = 0;
  	}else if(x > maxX){
  		x = maxX-1;
  	}else{
  		x=-minX;
  	}

  	minY = ((config.screen.height-1)/2);
  	maxY = this.height - minY;

  	if(y < minY){
  		y = 0;
	}else if(y > maxY){
		y = maxY-1;
  	}else{
  		y=-minY;
  	}

  	var objects = {};
  	for (var k=x;k<config.screen.width;k++){
  		for (var j=y;j<config.screen.height;j++){
  			// if(objectCoordinates[k][j]){

  			// }
  		}
  	}


  }

  set name(name) {
    this._name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  get name() {
    return this._name;
  }
  sayHello() {
    console.log('Hello, my name is ' + this.name + ', I have ID: ' + this.id);
  }
}


module.exports = Map;