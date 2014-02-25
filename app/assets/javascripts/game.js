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
  this.enemy;
  this.stars;
  this.fireButton;
  this.generatedLedge;

  //	You can use any of these from any function within this State.
  //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Rick.Game.prototype = {

  preload: function () {
    this.game.load.image('sky', 'assets/sky.png');
    this.game.load.image('ground', 'assets/platform.png');
    this.game.load.image('star', 'assets/star.png');
    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.game.load.spritesheet('rick', 'assets/rick.png', 94, 100);
  },

  create: function () {

    // Add background
    this.game.add.sprite(0,0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group()

    // here are preset ledges
    var ledge = this.platforms.create(50, 200, 'ground');
    ledge.body.velocity.x = -120;
    ledge.body.immovable = true;

    ledge = this.platforms.create(350, 300, 'ground');
    ledge.body.velocity.x = -120;
    ledge.body.immovable = true;

    ledge = this.platforms.create(700, 300, 'ground');
    ledge.body.velocity.x = -120;
    ledge.body.immovable = true;

    // here are the generated ledges
    setInterval(this.buildLedge.bind(this), 2000);


    // this.player = this.game.add.sprite(32, 0, 'dude');
    this.player = this.game.add.sprite(32, 0, 'rick');

    // this.player.body.bounce.y = 0.3;
    this.player.body.gravity.y = 6;
    this.player.body.collideWorldBounds = false;

    this.player.animations.add('right', [0,1,2,3,4,5,6,7], 10, true);
    this.player.animations.add('jump', [8], 10, false);

    // Adds Keyboard controls
    this.keybord = this.game.input.keyboard.createCursorKeys();
    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.stars = this.game.add.group();

    // Add Enemies
    setInterval( this.createEnemy.bind(this), 3000 );

  },

  update: function () {

    // Make player not fall through platforms
    this.game.physics.collide(this.player, this.platforms);

    if (this.player.body.touching.down)
      this.player.animations.play('right');

    if (this.keybord.up.isDown && this.player.body.touching.down){
      this.player.animations.play('jump');
      this.player.body.velocity.y = -400
    }

    if (this.enemy) {
      this.animateEnemy();
    }


    if (this.fireButton.isDown) {
    	var star = this.stars.create((this.player.x + 40), this.player.y, 'star');
      star.body.velocity.x = 800;
    }

    //Kill player if they touch the ground
    // if (player.y > 450) {
    // 	player.kill()
    // }

  },

  quitGame: function (pointer) {

    //	Here you should destroy anything you no longer need.
    //	Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //	Then let's go back to the main menu.
    this.game.state.start('MainMenu');
  },

  createEnemy: function () {
    this.enemy = this.game.add.sprite(500, 100, 'dude');
    this.enemy.animations.add('left', [0,1,2,3], 10, true);
    this.enemy.animations.play('left');
  },

  animateEnemy: function () {
    this.enemy.body.velocity.x = -200
  },

  getRandom: function (min, max) {
    return Math.random() * (max - min) + min;
  },

  buildLedge: function () {
    this.generatedLedge = this.platforms.create(this.getRandom(800, 1100), this.getRandom(100, 400), 'ground');
    this.generatedLedge.body.velocity.x = -120;
    this.generatedLedge.body.immovable = true;
  }

};






