Rick.Top5 = function (game) {
  this.$userName;
};

Rick.Top5.prototype = {

  create: function () {

    this.add.sprite(0, 0, 'top5');

    this.$userName = $('#userName');

    this.$userName
      .css({
        left: this.game.stage.offset.x + 150,
        top: this.game.stage.offset.y + 290
      })
      .removeClass('hidden')
      .focus();

    this.add.button(this.game.stage.offset.x + 265, this.game.stage.offset.y + 260, 'saveButton', this.saveScore, this, 0, 1);
  },

  saveScore: function () {
    // get the name
    var userName = this.$userName.val().substring(0,10);

    // save
    $.ajax({
      type: 'POST',
      url: "/scores",
      data: JSON.stringify({
        "username": userName,
        "points": this.game.state.states.Game.lastScore
      }),
      success: function() {
        this.game.state.start('Scores');
      },
      error: function() {
        this.game.state.start('GameOver');
      },
      complete: function() {
        this.$userName.addClass('hidden');
      },
      dataType: "json",
      contentType: "application/json",
      context: this
    });
  }



};