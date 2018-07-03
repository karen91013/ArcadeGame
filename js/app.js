// instantiate
// player
const player = new Player();

// 3 enemies
const allEnemies = [...Array(3)].map((_,i)=> new Enemy(0,i+1));

// listening for certain key strokes
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});