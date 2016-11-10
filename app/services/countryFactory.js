angular.module("testApp")
  .factory("countryFactory", function($http, SETTINGS) {
    var factory = {};

    factory.getAll = function() {
      return $http.get(SETTINGS.serverUrl + 'countries');
    };

    return factory;
  });
