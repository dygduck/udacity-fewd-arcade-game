// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // x and y (for the axis) sets the enemies initial location
    // speed sets the enemies speed
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // if the enemies position exceeds the play platform, this
    // initializes their position at the very beginning of the
    // screen (y axis) with a random speed.
    if(this.x > 510) {
      this.x = -50;
      this.speed = 100 + Math.floor(Math.random() * 220);
    }

    // if there happens a touch between the player and the
    // enemies the players position is updated to the beginning
    // position.

    if(player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && player.y + 60 > this.y) {
      player.x = 202;
      player.y = 405;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now writing our own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class function
var Player = function (x, y) {
  // The image/player for our player, this uses
  // a helper we've provided to easily load images
  // x and y (for the axis) sets the players initial location
  this.x = x;
  this.y = y;
  this.player = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  if(keyPress == 'left' && this.x > 0) {
    this.x -= 120;
  }
  if(keyPress == 'right' && this.x < 405) {
    this.x += 120;
  }
  if(keyPress == 'up' && this.y > 0) {
    this.y -= 83;
  }
  if(keyPress == 'down' && this.y < 0) {
    this.y += 83;
  }
  if(this.y < 0) {
    setTimeout(function() {player.x = 202; player.y = 405;
    }, 500);
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemyLocation = [230, 147, 63];


enemyLocation.forEach(function(locationY) {
  enemy = new Enemy(0,locationY, 200);
  allEnemies.push(enemy);
})

var player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  console.log(e);
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
