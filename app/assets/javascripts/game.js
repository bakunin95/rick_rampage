$(document).ready(function(){

var game = new Phaser.Game(800, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload(){

	game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

var player;
var platforms;
var cursors;

function create(){

	// A simple background for our game
    game.add.sprite(0,0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group()

    var ledge = platforms.create(350, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(0, 250, 'ground');
    ledge.body.immovable = true;


    player = game.add.sprite(32, 0, 'dude');

    player.body.bounce.y = 0.3;
    player.body.gravity.y = 6;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
     player.animations.add('left', [0,1,2,3], 10, true);
     player.animations.add('right', [5,6,7,8], 10, true);

    // Adds Keyboard controls
    cursor = game.input.keyboard.createCursorKeys();

}

function update(){

	// Make player not fall through platforms
    game.physics.collide(player, platforms);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursor.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
 
        player.animations.play('left');
    }
    else if (cursor.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
 
        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();
        
        // sets player sprite to frame 4 which is standing still idle looking at user
        player.frame = 4;
    }

    // Allow player to jump if they are touching the ground
    if (cursor.up.isDown && player.body.touching.down){
        player.body.velocity.y = -350
    }

}


});






