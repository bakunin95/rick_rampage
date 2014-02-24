Rick.Game = function (game) {

  //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

  this.game;		//	a reference to the currently running game
  this.add;		//	used to add sprites, text, groups, etc
  this.camera;	//	a reference to the game camera
  this.cache;		//	the game cache
  this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
  this.load;		//	for preloading assets
  this.math;		//	lots of useful common math operations
  this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
  this.stage;		//	the game stage
  this.time;		//	the clock
  this.tweens;	//	the tween manager
  this.world;		//	the game world
  this.particles;	//	the particle manager
  this.physics;	//	the physics manager
  this.rnd;		//	the repeatable random number generator


  this.platforms;
  this.player;
  this.keybord;

  //	You can use any of these from any function within this State.
  //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Rick.Game.prototype = {

  preload: function () {
    this.game.load.image('sky', 'assets/sky.png');
    this.game.load.image('ground', 'assets/platform.png');
    this.game.load.image('star', 'assets/star.png');
    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  },

  create: function () {

    this.game.add.sprite(0,0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group()

    var ledge = this.platforms.create(350, 400, 'ground');
    ledge.body.immovable = true;

    ledge = this.platforms.create(0, 250, 'ground');
    ledge.body.immovable = true;

    this.player = this.game.add.sprite(32, 0, 'dude');

    this.player.body.bounce.y = 0.3;
    this.player.body.gravity.y = 6;
    this.player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [0,1,2,3], 10, true);
    this.player.animations.add('right', [5,6,7,8], 10, true);

    // Adds Keyboard controls
    this.keybord = this.game.input.keyboard.createCursorKeys();


  },

  update: function () {


    // Make player not fall through platforms
    this.game.physics.collide(this.player, this.platforms);

    //  Reset the players velocity (movement)
    this.player.body.velocity.x = 0;

    if (this.keybord.left.isDown) {
      //  Move to the left
      this.player.body.velocity.x = -150;

      this.player.animations.play('left');

    } else if (this.keybord.right.isDown) {

      //  Move to the right
      this.player.body.velocity.x = 150;

      this.player.animations.play('right');
    } else {
      //  Stand still
      this.player.animations.stop();

      // sets player sprite to frame 4 which is standing still idle looking at user
      this.player.frame = 4;
    }

    // Allow player to jump if they are touching the ground
    if (this.keybord.up.isDown && this.player.body.touching.down){
      this.player.body.velocity.y = -350
    }
  },

  quitGame: function (pointer) {

    //	Here you should destroy anything you no longer need.
    //	Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //	Then let's go back to the main menu.
    this.game.state.start('MainMenu');
  }

};






