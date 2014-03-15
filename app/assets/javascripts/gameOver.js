Rick.GameOver = function (game) {
  this.text;
  // text
  // this.score = 0;
  this.scoreString;
  this.scoreText;
};

Rick.GameOver.prototype = {

  create: function () {

    // We've already preloaded our assets, so let's kick right into the Main Menu itself.
    //  Here all we're doing is playing some music and adding a picture and button
    //  Naturally I expect you to do something significantly better :)

    this.add.sprite(0, 0, 'gameOver');

    $('#tweeting').fadeIn();
    $('#tweeting').fadeOut();
    $('#tweeting').fadeIn();
    $('#tweeting').fadeOut();
    $('#tweeting').fadeToggle();

    // The score
    this.scoreString = 'Your score is:';
    this.scoreText = this.game.add.text(75, 200, this.scoreString + this.game.state.states.Game.lastScore, { font: '36px "Press Start 2P"', fill: '#182450' });

    this.add.button(293, 260, 'rankButton', this.scoresMenu, this, 0, 1);
    this.add.button(198, 342, 'playAgainButton', this.startGame, this, 1, 0);
    this.add.button(232, 425, 'mainMenuButton', this.mainMenu, this, 0, 1);

  },
  

  update: function () {

    //  Do some nice funky main menu effect here

  },

  scoresMenu: function () {

    //  And start the actual game
    this.game.state.start('Scores');

  },

  startGame: function () {

    // this.musicMenu.stop();

    // hide stats menus
    // $('.score_div').fadeOut( 1200 );

    //  And start the actual game
    this.game.state.start('Game');
  },

  mainMenu: function () {

    //  And start the actual game
    this.game.state.start('MainMenu');

  }



};