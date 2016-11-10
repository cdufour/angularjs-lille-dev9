angular.module("testApp")
  .factory("clientFactory", function($http) {
    var factory = {};

    factory.getAll = function() {
      return $http.get("http://localhost:4000/clients/");
    };

    factory.getByLastname = function(lastname) {
      for (var i=0; i<clients.length; i++) {
        if (clients[i].lastname === lastname) return clients[i];
      }
      return null; // si aucun client trouvé dans la boucle, renvoie null
    };

    factory.getByCountry = function(country) {
      var clientsByCountry = [];
      clients.forEach(function(client) {
        if (client.country === country) clientsByCountry.push(client);
      });
      return clientsByCountry;
    };

    return factory;
  });
