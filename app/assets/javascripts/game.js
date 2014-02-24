$(document).ready(function(){

var game = new Phaser.Game(800, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// addKeyCapture(32);

function preload(){

	game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

var player;
var platforms;
var cursors;
var stars;
var fireButton;
var generatedLedge;

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function buildLedge() {

	// platforms = game.add.group()

		
	generatedLedge = platforms.create(getRandom(800, 1100), getRandom(100, 400), 'ground');
	generatedLedge.body.velocity.x = -120;
  	generatedLedge.body.immovable = true;

}

function create(){

	

	// A simple background for our game
    game.add.sprite(0,0, 'sky');


    	platforms = game.add.group()
    	
    	// here are preset ledges
    	var ledge = platforms.create(50, 200, 'ground');
    	ledge.body.velocity.x = -120;
    	ledge.body.immovable = true;

    	ledge = platforms.create(350, 300, 'ground');
    	ledge.body.velocity.x = -120;
    	ledge.body.immovable = true;

    	ledge = platforms.create(700, 300, 'ground');
    	ledge.body.velocity.x = -120;
    	ledge.body.immovable = true;


		// here are the generated ledges
		setInterval(buildLedge, 2000);
		


    player = game.add.sprite(100, 0, 'dude');

    // player.body.bounce.y = 0.1;
    player.body.gravity.y = 10;
    player.body.collideWorldBounds = false;

    //  Our two animations, walking left and right.
     player.animations.add('left', [0,1,2,3], 10, true);
     player.animations.add('right', [5,6,7,8], 10, true);

    // Adds Keyboard controls
    cursor = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    stars = game.add.group();

}

function update(){

	// Make player not fall through platforms
    game.physics.collide(player, platforms);
    // game.physics.collide(player, generatedLedge);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    // if (cursor.left.isDown)
    // {
    //     //  Move to the left
    //     player.body.velocity.x = -150;
 
    //     player.animations.play('left');
    // }
    // else if (cursor.right.isDown)
    // {
    //     //  Move to the right
    //     player.body.velocity.x = 150;
 
    //     player.animations.play('right');
    // }
    // else
    // {
    //     //  Stand still
    //     player.animations.stop();
        
    //     // sets player sprite to frame 4 which is standing still idle looking at user
    //     player.frame = 4;
    // }

    // Allow player to jump if they are touching the ground
    if (cursor.up.isDown && player.body.touching.down){
        player.body.velocity.y = -400
    }
    else if (cursor.up.isDown && !(player.body.touching.down)){
    	player.body.velocity.y = -200
    }

    if (fireButton.isDown) {
    	star = stars.create((player.x + 40), player.y, 'star');
        star.body.velocity.x = 800;
    }

    //Kill player if they touch the ground
    // if (player.y > 450) {
    // 	player.kill()
    // }

}


});






