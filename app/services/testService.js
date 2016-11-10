angular.module("testApp")
  .service("testService", function() {
    var players = ['Pogba', 'Lloris', 'Evra'];

    this.getPlayers = function() {
      return players;
    };

  });
