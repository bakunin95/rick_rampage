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

    this.musicMenu = this.musicMenu || this.add.audio('mainMenuSound', 1, true);

    if (!this.musicMenu.isPlaying) {
      this.musicMenu.play();
    }

    this.add.button(100, 300, 'playButton', this.startGame, this, 1, 0);
    this.add.button(450, 300, 'scoresButton', this.scoresMenu, this, 1, 0);

    // Add Player Statistics
    this.playerStats($('.score_div'));

  },

  update: function () {

    //	Do some nice funky main menu effect here

  },

  playerStats: function (node) { // player states load

    node.fadeIn(1200);

  },

  startGame: function () {

    this.musicMenu.stop();

    // hide stats menus
    $('.score_div').fadeOut(1200);

    //	And start the actual game
    this.game.state.start('Game');
  },

  scoresMenu: function () {

    //	And start the actual game
    this.game.state.start('Scores');

  }

};

