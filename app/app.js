// déclaration du module principal
// le module ngRoute permet de gérer le routing
angular.module("testApp", ["ngRoute"]);

// variante déclarative
// var app = angular.module("testApp", []);

// Configuration des routes
angular.module("testApp").config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/clients.html',
      controller: 'mainController'
    })
    .when('/clients', {
      templateUrl: 'app/views/clients.html'
    })
    .when('/clients/:lastname', {
      templateUrl: 'app/views/client.html',
      controller: 'clientController'
    })
    .when('/test', {
      templateUrl: 'app/views/test.html',
      controller: 'testController'
    })
    .when('/404', {
      templateUrl: 'app/views/404.html'
    })
    .otherwise({redirectTo:'/404'});
});

angular.module("testApp")
  .constant("AUTEUR", "Christophe")
  .constant("SETTINGS", {
    version: 1,
    email: "test@test.de",
    active: true,
    serverUrl: "http://localhost:4000/"
  });


// Enregistrement des controllers
angular.module("testApp")
  .controller("mainController",
    function($http, $scope, $rootScope, clientFactory, countryFactory) {

    var cbFailure = function(res) {
      console.log("ERREUR: " + res.status);
    };

    $rootScope.clients = ['alpha', 'beta', 'gamma'];
    //$scope.clients = clientFactory.getAll();
    clientFactory.getAll().then(function(clients) {
      $scope.clients = clients.data;
      clientFactory.set(clients.data);
    }, cbFailure);

    countryFactory.getAll().then(function(res) {
      $scope.countries = res.data;
    }, cbFailure);

    $scope.reset = function() {
      $scope.texteSaisi = "";
      $scope.texteSaisi2 = "";
    };

    // on coche la case par programmation
    // elle est cochée par défaut
    $scope.isChecked = true;

    // initialisation
    $scope.myClass = "";

    // options de filtres
    $scope.criterium = 'name';
    $scope.reverse = false;
    $scope.messageError = "";

    $scope.client = {
      lastname: "",
      name: "",
      age: "",
      country: "France",
      images: ['baggio.jpg']
    };

    var nbClics = 0;
    $scope.changeStyle = function() {
      if (nbClics == 0) {
        $scope.myClass = "class1";
      } else {
        $scope.myClass = "class2";
      }
      nbClics++;
    };

    var youngest = getYoungest();

    $scope.styleYoungest = function(age) {
      return (age == youngest) ? 'class1' : '';
    };

    function getYoungest() {
      var youngest = $scope.clients[0].age;
      $scope.clients.forEach(function(client) {
          if (client.age < youngest) {
            youngest = client.age;
          }
      });
      return youngest;
    }



    $scope.changeOrder = function(criterium) {
      $scope.criterium = criterium;
      $scope.reverse = !$scope.reverse;
    };

    $scope.saveClient = function() {
      // efface l'éventuel message précédemment affiché
      $scope.messageError = "";
      if (
        !isOneFieldEmpty($scope.client,
          ["country", "imageUrl"]) && isNumeric($scope.client.age)
      ) {
        clientFactory.addClient($scope.client).then(function(res) {
          $scope.clients.push($scope.client);
        }, cbFailure);

      } else {
        $scope.messageError = "pas bien";
      }

    }; // fin saveClient()

    $scope.removeClient = function(lastname) {
      // itérer les clients
      for (var i = 0; i < $scope.clients.length; i++) {
        // comparer le client itéré avec l'argument lastname
        if ($scope.clients[i].lastname === lastname) {
          // supprimer le client du tableau des clients si
          // la comparaison vaut vrai
          $scope.clients.splice(i, 1);
        }
      }
    };
  })
  .controller("menuController", function($scope) {
    $scope.menus = [
      {label:"Accueil", url:"#/"},
      {label:"Clients", url:"#/clients"},
      {label:"Aide", url:"/aide.html"},
      {label:"Test", url:"#/test"}
    ];
  })
  .controller("clientController",
    function($scope, $rootScope, $routeParams, $interval,
      clientFactory, testService, SETTINGS) {

        if (clientFactory.isDataLoaded()) {
          displayClient();
        } else {
          clientFactory.getAll().then(function(clients) {
            clientFactory.set(clients.data);
            displayClient();
          });
        }

    function displayClient() {
      var client = clientFactory.getByLastname($routeParams.lastname);
      $scope.client = client;
      var DELAY = 4000;
      var imagePath = 'app/img/';
      $scope.imageClient = imagePath + client.images[0];
      var i = 1;

      $interval(function() {
        $scope.imageClient = imagePath + client.images[i];
        i++;
        // vérifier qu'on ne sort pas des bornes du tableau de photos
        if (i === client.images.length) i = 0;
      }, DELAY);

      $scope.clients = clientFactory.getByCountry(client.country);
    }

  });
