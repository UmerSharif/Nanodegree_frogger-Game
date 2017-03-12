// Enemies our player must avoid
var Enemy = function(x, y, velocity) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = velocity;
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if(this.x > 500){
        this.reset();
    }

    detectCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function(){
           this.x = 0;
           this.y = Math.random() * 190 + 50;
           this.speed = Math.random() * 256;
};

var detectCollision = function(EnemyObj){
    if(player.x + 50 >= EnemyObj.x && player.x <= EnemyObj.x + 50  && player.y + 50 >= EnemyObj.y && player.y <= EnemyObj.y + 50 ){
        player.reset();
         document.getElementById("display").innerHTML = "You are Eaten Alive";
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, velocity){
    this.x = x;
    this.y = y;
    this.speed = velocity;
    this.sprite = 'images/char-boy.png';

};

//update method for player
Player.prototype.update = function(){
      if(this.y < 10){
         document.getElementById("display").innerHTML = "You made it to the sea";
          player.reset();
      }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keydown){
    if(keydown === 'left' && this.x > 3 ){
        this.x -= this.speed;
    }
    else if(keydown === 'right' && this.x < 400){
        this.x += this.speed;

    }
    else if(keydown === 'down' && this.y < 400){
        this.y += this.speed;
    }

    else if(keydown === 'up'){
        this.y -= this.speed;
    }


};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 410;
    this.speed = 40;

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 390, 40);
var enemy1 = new Enemy(0, Math.random() * 190 + 50, Math.random() * 256);
var enemy2 = new Enemy(0, Math.random() * 190 + 40, Math.random() * 256);
var enemy3 = new Enemy(0, Math.random() * 190 + 30, Math.random() * 256);
allEnemies.push(enemy1,enemy2,enemy3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
