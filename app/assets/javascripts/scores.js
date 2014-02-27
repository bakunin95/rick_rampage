Rick.Scores = function (game) {
  this.text;
};

Rick.Scores.prototype = {
  preload: function () {
    $.getJSON('/scores/top5', function (data){

    });
  },

  create: function () {

    //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
    //	Here all we're doing is playing some music and adding a picture and button
    //	Naturally I expect you to do something significantly better :)

    this.add.sprite(0, 0, 'scoresBackground');

  },

  update: function () {

    //	Do some nice funky main menu effect here

  }

};


