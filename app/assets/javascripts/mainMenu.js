
Rick.MainMenu = function (game) {

  this.music = null;
  this.playButton = null;

};

Rick.MainMenu.prototype = {

  create: function () {

    //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
    //	Here all we're doing is playing some music and adding a picture and button
    //	Naturally I expect you to do something significantly better :)

    this.add.sprite(0, 0, 'preloaderBackground');

    this.musicMenu = this.add.audio('mainMenuSound');
    this.musicMenu.play();

    this.playButton = this.add.button(100, 300, 'playButton', this.startGame, this, 1, 0);

  },

  update: function () {

    //	Do some nice funky main menu effect here

  },

  startGame: function (pointer) {

    this.musicMenu.stop();

    //	And start the actual game
    this.game.state.start('Game');

  }

};

