
Rick.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;

  this.ready = false;

};

Rick.Preloader.prototype = {

  preload: function () {

    //	These are the assets we loaded in Boot.js
    //	A nice sparkly background and a loading progress bar
    this.background = this.add.sprite(0, 0, 'preloaderBackground');
    this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

    //	This sets the preloadBar sprite as a loader sprite.
    //	What that does is automatically crop the sprite from 0 to full-width
    //	as the files below are loaded in.
    this.load.setPreloadSprite(this.preloadBar);

    //	Here we load the rest of the assets our game needs.
    //	As this is just a Project Template I've not provided these assets, swap them for your own.
    this.load.audio('titleMusic', ['assets/soundtrack.mp3']);
    this.load.audio('explosionSound', ['assets/explosion.mp3']);
    this.load.audio('shootSound', ['assets/shoot.mp3']);
    this.load.audio('dieSound', ['assets/kill.mp3']);
    this.load.audio('deathSound', ['assets/death.mp3']);
    this.load.audio('mainMenuSound', ['assets/mainMenuSoundTrack.mp3']);

    this.load.image('ground', 'assets/platform4.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('desert', 'assets/desert.png');
    this.load.image('head', 'assets/rick_head.png');

    this.load.image('scoresBackground', 'assets/scoresBackground.png');

    this.load.spritesheet('playButton', 'assets/playButton.png', 229, 72);
    this.load.spritesheet('scoresButton', 'assets/scoresButton.png', 268, 72);
    this.load.spritesheet('signinButton', 'assets/signinButton.png', 294, 72);

    this.load.spritesheet('bullets','assets/bullet-2.png', 42, 34);
    this.load.spritesheet('wasp', 'assets/wasp-rough.png', 183, 125);
    this.load.spritesheet('rick', 'assets/rick.png', 94, 100);
    this.load.spritesheet('explosion', 'assets/enemy_explosion.png', 132, 262);
    //this.load.spritesheet('panicButtonSprite', 'assets/panic.png', 183, 125);
    //this.load.script('tunnelFilter', 'assets/Tunnel.js'); // tunnel filter

  },

  create: function () {

    //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
    this.preloadBar.cropEnabled = false;

  },

  update: function () {

    //	You don't actually need to do this, but I find it gives a much smoother game experience.
    //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
    //	You can jump right into the menu if you want and still play the music, but you'll have a few
    //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
    //	it's best to wait for it to decode here first, then carry on.

    //	If you don't have any music in your game then put the game.state.start line into the create function and delete
    //	the update function completely.

    if (this.cache.isSoundDecoded('mainMenuSound') && this.ready == false)
    {
      this.ready = true;
      this.game.state.start('MainMenu');
    }

  }

};