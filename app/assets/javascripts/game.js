'use strict';

//overriding the framework so rick doesn't get stuck on those platform transitions
Phaser.Physics.Arcade.prototype.separate = function (body1, body2) {

        this._result = (this.separateY(body1, body2) || this.separateX(body1, body2));
    }

Rick.Game = function (game) {

  // When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

  this.game; // a reference to the currently running game
  this.add; // used to add sprites, text, groups, etc
  this.camera; // a reference to the game camera
  this.cache; // the game cache
  this.input; // the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
  this.load; // for preloading assets
  this.math; // lots of useful common math operations
  this.sound; // the sound manager - add a sound, play one, set-up markers, etc
  this.stage; // the game stage
  this.time; // the clock
  this.tweens; // the tween manager
  this.world; // the game world
  this.particles; // the particle manager
  this.physics; // the physics manager
  this.rnd; // the repeatable random number generator

  this.background;

  // platforms
  this.platforms;
  this.platformVelocity = -250;
  this.platformsTime = 0;
  this.platformsTimeAdd = 2000;

  this.player;
  this.keyboard;
  this.fireButton;
  this.generatedLedge;
  this.jumpcount = 0;
  this.jumpTimeBegin;

  // bullets
  this.bullets;
  this.bullet;
  this.bulletTime  = 0;

  // enemies
  this.enemies;
  this.enemiesTime = 0; // used to create enemies in a time interval
  this.nextEnemyTime = 3000; // time span. Will decrease to increase difficult level
  this.enemyKillPoint = 20;
  this.enemyVelocity = -400;

  // levels (of difficulty)
  this.levelTime;
  this.changeLevelTime = 5000; // interval

  //Reset player position
  this.posResetTime = 0;
  this.posResetIntervalTime = 2000;

  // explosion
  this.explosions;
  

  // save amount of seconds passed at quitGame
  this.speedTime= 0;


  // text
  this.score = 0;
  this.scoreString;
  this.scoreText;


  //Lives
  this.lives;


  //	You can use any of these from any function within this State.
  //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Rick.Game.prototype = {

  preload: function () {

  },

  create: function () {

  	// check if dead or not
  	

    // Rock!!!
    this.music = this.add.audio('titleMusic');
    this.explosionSound = this.add.audio('explosionSound');
    this.shootSound = this.add.audio('shootSound');
    this.dieSound = this.add.audio('dieSound');
    this.deathSound = this.add.audio('deathSound');
    this.music.play();

    // The scrolling background
    this.background = this.game.add.sprite(0, 0, 'desert');

    //  Our bullet group
    this.bullets = this.game.add.group();
    this.bullets.createMultiple(30, 'bullets', 3);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    this.platform = this.game.add.sprite(0,0, 'ground');
    this.platform.reset(200, 400);
    this.platform.scale.setTo(4,2);
    this.platform.body.velocity.x = this.platformVelocity;
    this.platform.body.immovable = true;

    this.platforms.add(this.platform);

    // Create player
    this.createPlayer();

    // Adds Keyboard controls
    this.keyboard = this.game.input.keyboard.createCursorKeys();
    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Add Enemies
    this.enemiesTime = this.game.time.now + this.nextEnemyTime;
    this.enemies = this.game.add.group();

    // An explosion pool
    this.explosions = this.game.add.group();
    this.explosions.createMultiple(30, 'explosion');
    this.explosions.forEach(this.setUpExplosions, this);

    // Level
    this.levelTime = this.game.time.now + this.changeLevelTime;


    // The score
    this.scoreString = 'Score : ';
    this.scoreText = this.game.add.text(10, 10, this.scoreString + this.score, { font: '20px "Press Start 2P"', fill: '#182450' });

    // Lives display
    this.lives = this.game.add.group();
    this.game.add.text(10, 450, 'Lives : ', { font: '20px "Press Start 2P"', fill: '#fff' });

    // The 3 lives as objects (head)
    for (var i = 0; i < 3; i++) 
    {
        var head = this.lives.create(180 + (50 * i), 460, 'head');
        head.anchor.setTo(0.5, 0.5);
        head.alpha = 0.4;
    }

  },

  update: function () {

    this.createPlatform();
    this.setLevel();
    this.createEnemy();

    // collisions
    this.game.physics.collide(this.bullets, this.enemies, this.collisionHandler, null, this);
    this.game.physics.collide(this.player, this.platforms);
    this.game.physics.collide(this.player, this.enemies, this.collisionHandlerHitEnemy, null, this);

    if (this.player.body.touching.down) {
    	this.player.animations.play('right');
    }


    this.checkPlayerJump();

    // Reset Ricks Position
    this.checkRickPosition();

    //Increase speed of platforms for every second
    this.updateSpeed();


    //  Firing?
    if (this.fireButton.isDown) {
      this.fireBullet();
    }

    // Kill player if they touch the ground
    if (this.player.y > 450 ) {
    	this.collisionHandlerFall(this.player);
    }

    // Kill player if they go out of left side of screen
    if (this.player.x < -10 ) {
    	this.collisionHandlerFall(this.player);
    }

  },

  updateSpeed: function() {
    if (this.game.time.now > this.speedTime) {
      if (this.platformVelocity < -100){
        this.platformVelocity -= 1;
        this.platformsTimeAdd -= 10;
        this.speedTime = this.game.time.now + 1000;
      }
      
    }
  },


  checkPlayerJump: function() {
    if (this.keyboard.up.isDown && this.player.body.touching.down){
      this.jumpcount = 0;
      this.player.animations.play('jump');
      this.player.body.velocity.y = -350;
      this.jumpcount++;
      this.jumpTimeBegin = this.game.time.now + 300;
    } else if (this.keyboard.up.isDown && this.game.time.now > this.jumpTimeBegin && this.jumpcount === 1){
      this.player.body.velocity.y = -400;
      this.jumpcount++;
    }
  },

  checkRickPosition: function() {
    if (this.game.time.now > this.posResetTime) {
      this.player.body.x = 100; 
      this.posResetTime = this.game.time.now + this.posResetIntervalTime;
    }
  },

  collisionHandler: function(bullet, enemy) {
    //  When a bullet hits an alien we kill them both
    bullet.kill();
    enemy.kill();

    this.explosionSound.play();
    this.score += this.enemyKillPoint;
    this.scoreText.content = this.scoreString + this.score;

    //  And create an explosion :)
    var explosion = this.explosions.getFirstDead();
    explosion.reset(enemy.body.x + 50, enemy.body.y + 30);
    explosion.play('explosion', 30, false, true);

  },

  collisionHandlerHitEnemy: function(player, enemy) {
  	enemy.kill();
    this.explosionSound.play();

  	// get the first head (out of the 3 that exist)
  	var live = this.lives.getFirstAlive();

  	// if any lives exist, kill them
  	if (live)
    {
        live.kill();
        player.kill();
        this.dieSound.play();
        this.enemies.removeAll();
        this.createPlayer();

    }

  	// When the player dies
    if (this.lives.countLiving() < 1){
    	player.kill();
      this.deathSound.play();
    	this.quitGame();
    }

  	//  And create an explosion :)
    var explosion = this.explosions.getFirstDead();
    explosion.reset(enemy.body.x + 50, enemy.body.y + 30);
    explosion.play('explosion', 30, false, true);

    //  And create an explosion :)
    explosion = this.explosions.getFirstDead();
    explosion.reset(player.body.x + 50, player.body.y + 30);
    explosion.play('explosion', 30, false, true);

  },



  collisionHandlerFall: function(player){

  	
    // get the first head (out of the 3 that exist)
  	var live = this.lives.getFirstAlive();
  	

  	// if any lives exist, kill them
  	if (live)
    {
        live.kill();
        player.kill();
        this.enemies.removeAll();
        this.dieSound.play();
        this.createPlayer();
    }
  	// When the player dies
    if (this.lives.countLiving() < 1){
    	player.kill();
    	this.quitGame();
      	this.deathSound.play();
    	// this stops multiple deaths when he falls, set to false everywhere else
    }

    //  And create an explosion :)
    var explosion = this.explosions.getFirstDead();
    explosion.reset(player.body.x + 50, player.body.y + 30);
    explosion.play('explosion', 30, false, true);

  },

  setUpExplosions: function(explosion) {
    explosion.anchor.x = 0.5;
    explosion.anchor.y = 0.5;
    explosion.animations.add('explosion');
  },

  quitGame: function () {

	this.updatePlayerStats(this.score, $('#player_id').html());

    // Here you should destroy anything you no longer need.
    // Stop music, delete sprites, purge caches, free resources, all that good stuff.
    this.game.cache.destroy();
    this.enemies.removeAll();

    this.platformVelocity = -250;
    this.platformsTimeAdd = 2000;

    this.music.stop();



    this.score = 0;
    this.nextEnemyTime = 3000;

    // reset the platform velocity

    this.player.revive();
    this.lives.callAll('revive');

    this.game.state.start('MainMenu');

  },

   createPlayer: function () {
  	// Create player
    this.player = this.game.add.sprite(100, 0, 'rick');
    this.player.body.setSize(60, 90, 0, 0);
    this.player.fixedToCamera;
    this.player.anchor.setTo(0.5, 0.5);
    this.player.body.gravity.y = 10;
    // player will still die, but will survive if in the air at the time
    this.player.body.collideWorldBounds = false;

    this.player.animations.add('right', [0,1,2,3,4,5,6,7], 10, true);
    this.player.animations.add('jump', [8], 10, false);

  },

  createEnemy: function () {
    if (this.game.time.now > this.enemiesTime) {
      this.enemy = this.game.add.sprite(600, 100, 'wasp');
      // this sets the bounding box (collision area) to be smaller, for more precise collision
      this.enemy.body.setSize(170, 110, 0, 0);
      this.enemy.animations.add('left', [0,1,2], 10, true);
      this.enemy.animations.play('left');
      this.enemy.outOfBoundsKill =  true;

      this.enemies.add(this.enemy);

      if (this.enemy) {
        var yPos = [100, 125, 150, 175, 200, 225, 250];
        this.enemy.reset(750, yPos[this.getRandom(0, yPos.length - 1)]);
        this.enemy.body.velocity.x = this.enemyVelocity;
        this.enemiesTime = this.game.time.now + this.nextEnemyTime;
      }
    }
  },

  createPlatform: function() {
    this.platforms.forEachAlive(function(platform){
      if (platform.offset.x < 0) {
        platform.outOfBoundsKill = true;
      }
    });

    if (this.game.time.now > this.platformsTime) {
      this.platform = this.game.add.sprite(0, 0, 'ground');

      this.platforms.add(this.platform);

      if (this.platform) {
        var xPos = [800, 900];
        var yPos = [350, 400, 450];
        this.platform.scale.setTo(2,2);
        this.platform.reset(xPos[this.getRandom(0, xPos.length - 1)], yPos[this.getRandom(0, yPos.length - 1)]);
        this.platform.body.velocity.x = this.platformVelocity;
        console.log(this.platform.body.velocity.x)
        this.platform.body.immovable = true;
        this.platformsTime = this.game.time.now + this.platformsTimeAdd;
        console.log(this.platformsTimeAdd)
      }
    }
  },

  getRandom: function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },

  updatePlayerStats: function(latestScore, playerID) {

	console.log(playerID);
	console.log(latestScore);
	// only store score if score not equal to zero and not the same score as the previous game score
	if (latestScore !== 0 && latestScore !== $('#latest_score').html()) { 
		var res = $.ajax({
		  type: 'POST',
		  url: "/scores",
		  data: JSON.stringify({
		  	"user_id":playerID,
		    "points":latestScore
		  }),
		  error: function(e) {
		    console.log(e);
		  },
		  dataType: "json",
		  contentType: "application/json"
		})

		var addGameStats = function(data) {
			console.log("data is: " + data);
			$('#tweeting').find('a').attr("data-text", "<%= My Latest Score: @email_string %>");
			$('#latest_score').html(data.points);

		}

		res.done(function(data, textStatus, xhr) {
		  		addGameStats(data);
		  		console.log(data);
		})

	};

  },

  buildLedge: function () {
    this.generatedLedge = this.platforms.create(this.getRandom(800, 1000), this.getRandom(250, 450), 'ground');
    this.generatedLedge.scale.setTo(this.getRandom(2,3),1);
    this.generatedLedge.body.velocity.x = -190;
    this.generatedLedge.body.immovable = true;
  },

  fireBullet: function() {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (this.game.time.now > this.bulletTime) {
      //  Grab the first bullet we can from the pool
      this.bullet = this.bullets.getFirstExists(false);

      if (this.bullet) {
        //  And fire it
        this.shootSound.play();
        this.bullet.reset(this.player.x + 40, this.player.y + 10);
        this.bullet.body.velocity.x = 800;
        this.bulletTime = this.game.time.now + 300;
      }
    }

  },

  setLevel: function() {
    // increase difficult
    if (this.game.time.now > this.levelTime) {
      if (this.nextEnemyTime > 500) {
        this.nextEnemyTime -= 500;
      }

      this.levelTime += this.changeLevelTime;
    }
  }

};
