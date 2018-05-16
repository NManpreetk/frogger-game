const levels = document.querySelector('#levels');
const bestPlayed = document.querySelector("#best");
let levelCounter = 1;
let sec = 0;

//This is the enemy which gives it position and speed
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = 0;
    }
    //This is the collision of the player with the bug.
    if (this.y + 100 > player.y &&
        this.y < player.y + 40 &&
        this.x + 30 > player.x &&
        this.x < player.x + 20) {
        player.y = 400;
        player.x = 200;
    }
};

// Draw the enemy on the screen.
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
const Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}

//This is the update function which runs when the player goes in water.
Player.prototype.update = function () {
    if (this.y <= 25) {
        start();//This will count the levels
        played();//This will count the best level played
        window.alert('well done');
        this.reset()//This will reset the position of the player
        sec = 0;//THis will reset the timer to zero when a level completes
        timer()
        //This increases the speed of the enemies
        enemy1.speed = enemy1.speed + 10;
        enemy2.speed = enemy2.speed + 20;
        enemy3.speed = enemy3.speed + 30;        
    }
}

//This function counts the levels played by the player.
function start() {
    levelCounter++;
    levels.textContent = levelCounter;
}

//This function counts the best played level of the player i.e. last level played.
function played() {
    bestPlayed.textContent = levelCounter - 1;
}

//This is the reset function which happens when the player goes in water.
//There is default position of the player
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
}

//This is the timer function.
function timer(value) {
    return value > 9 ? value : "0" + value;
}
setInterval(function () {
    document.getElementById("seconds").innerHTML = timer(++sec % 60);
    document.getElementById("minutes").innerHTML = timer(parseInt(sec / 60, 10));
}, 1000);

//This is the image of the player.
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//This is the position of the player before the game starts.
const player = new Player(200, 400);

//This will handle the movement of the player in up, down, left and right direction.
player.handleInput = function (e) {
    if (e == 'up') {
        this.y -= 85;
        if (this.y < -20) {
            this.y = -20;
        }
    }

    if (e == 'down') {
        this.y += 85;
        if (this.y > 400) {
            this.y = 400;
        }
    }

    if (e == 'left') {
        this.x -= 100;
        if (this.x < 0) {
            this.x = 0;
        }
    }

    if (e == 'right') {
        this.x += 100;
        if (this.x > 400) {
            this.x = 400;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(50, 55, 200);
const enemy2 = new Enemy(10, 145, 200);
const enemy3 = new Enemy(300, 230, 200);
const allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});