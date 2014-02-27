Rick.Scores = function (game) {
  this.text;
};

Rick.Scores.prototype = {
  preload: function () {
    $.ajax({
      dataType: "json",
      url: '/scores/top5',
      success: function (data) {
        for (var i = 0; i < data.length; i += 1) {
          this.game.add.text(350, 200 + i * 40, data[i].points, { fontSize: '34px', fill: '#fff', align: 'center' });
        }
      },
      context: this
    });
  },

  create: function () {

    //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
    //	Here all we're doing is playing some music and adding a picture and button
    //	Naturally I expect you to do something significantly better :)

    this.add.sprite(0, 0, 'scoresBackground');
    this.add.button(230, 410, 'mainMenuButton', this.mainMenu, this, 0, 1);

  },

  update: function () {

    //	Do some nice funky main menu effect here

  },

  mainMenu: function () {

    //  And start the actual game
    this.game.state.start('MainMenu');

  }

};


