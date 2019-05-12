class Player {
  constructor(connectionIndex,username) {
    this.connectionIndex = connectionIndex;
    this.username = username;
    this.direction = 0;//0:stop 1:up 2:right 3:down 4:left
    this.x = 1;
    this.y = 1;
    this.updatePosition();
    console.log("New player #"+connectionIndex+" "+username+" is created");
  }

  move(){
    switch(this.direction){
      case 1:
        if(this.y>0){
          if(game.map.walkable(this.x,this.y-1)){
            this.clearOldPosition();
            this.y--;
            console.log(this.connectionIndex + ' moved up');
            this.updatePosition();
          }else{
            this.direction = 0;
            console.log(this.connectionIndex + ' stopped');
          }
        }
      break;
      case 2:
        if(this.x<game.map.width){
          if(game.map.walkable(this.x+1,this.y)){
            this.clearOldPosition();
            this.x++;
            console.log(this.connectionIndex + ' moved right');
            this.updatePosition();
          }else{
            this.direction = 0;
            console.log(this.connectionIndex + ' stopped');
          }
        }
      break;
      case 3:
        if(this.y<game.map.height){
          if(game.map.walkable(this.x,this.y+1)){
            this.clearOldPosition();
            this.y++;
            console.log(this.connectionIndex + ' moved down');
            this.updatePosition();
          }else{
            this.direction = 0;
            console.log(this.connectionIndex + ' stopped');
          }
        }
      break;
      case 4:
        if(this.x>0){
          if(game.map.walkable(this.x-1,this.y)){
            this.clearOldPosition();
            this.x--;
            console.log(this.connectionIndex + ' moved left');
            this.updatePosition();
          }else{
            this.direction = 0;
            console.log(this.connectionIndex + ' stopped');
          }
        }
      break;
    }
    return;
  }

  clearOldPosition(){
    if(game.map.objectCoordinates[this.x][this.y][this.connectionIndex]){
      console.log(this.connectionIndex + ' old positon is cleaned');
      delete game.map.objectCoordinates[this.x][this.y][this.connectionIndex];
    }
  }

  updatePosition(){
    console.log(this.connectionIndex + ' positon is updated to x: ' + this.x + ' y: ' + this.y);
    game.map.objectCoordinates[this.x][this.y][this.connectionIndex]=1;
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

module.exports = Player;