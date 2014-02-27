
Rick.MainMenu = function (game) {

  this.music = null;
  this.playButton = null;

};

Rick.MainMenu.prototype = {

  create: function () {

    //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
    //	Here all we're doing is playing some music and adding a picture and button
    //	Naturally I expect you to do something significantly better :)

    this.add.sprite(0, 0, 'desert');

    this.playButton = this.add.button(300, 200, 'playButton', this.startGame, this);

	// Add Player Statistics
    this.playerStats($('.score_div'));

  },

  update: function () {

    //	Do some nice funky main menu effect here

  },

  playerStats: function(node) { // player states load
  	
	node.fadeIn( 1200 );

	return false;
  },

  startGame: function (pointer) {

	// hide stats menus
	$('.score_div').fadeOut( 1200 );


    //	And start the actual game
    this.game.state.start('Game');

  }

};

