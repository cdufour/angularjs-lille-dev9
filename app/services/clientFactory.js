angular.module("testApp")
  .factory("clientFactory", function($http, SETTINGS) {
    var factory = {};
    var clients = null;

    factory.isDataLoaded = function() {
      return (clients === null) ? false : true;
    };

    factory.set = function(data) {
      clients = data;
    };

    factory.getAll = function() {
      return $http.get(SETTINGS.serverUrl + 'clients');
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

    factory.addClient = function(client) {
      return $http.post(SETTINGS.serverUrl + 'clients', client);
    };

    return factory;
  });
