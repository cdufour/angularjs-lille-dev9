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

angular.module("testApp").constant("AUTEUR", "Christophe");

// Enregistrement des controllers
angular.module("testApp")
  .controller("mainController", function($scope, $rootScope, AUTEUR) {
    console.log(AUTEUR);

    $rootScope.clients = ['alpha', 'beta', 'gamma'];

    $scope.clients = [
      {name:'Roberto', lastname:'Baggio', age:78, country:'Italie', imageUrl:'baggio.jpg'},
      {name:'Hanz', lastname:'Muller', age:32, country:'Allemagne', imageUrl:'deniro.jpg'},
      {name:'Giorgio Paulo', lastname:'Chiellini', age:45, country:'Italie', imageUrl:'deniro.jpg'},
      {name:'Manuel', lastname:'Neur', age:8, country:'France', imageUrl:'baggio.jpg'},
      {name:'Etienne', lastname:'Marcel Paul', age:23, country:'France', imageUrl:'deniro.jpg'},
      {name:'David', lastname:'Beckham', age:65, country:'Italie', imageUrl:'beckham.jpg'}
    ];

    var countries = ["France", "Allemagne", "Italie", "Belgique"];
    $scope.countries = countries;

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
      country: "",
      imageUrl: "baggio.jpg"
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
          ["country", "imageUrl"]) &&
        /*
        $scope.client.lastname.length &&
        $scope.client.name.length > 0 &&
        $scope.client.age.length > 0 &&
        */
        isNumeric($scope.client.age)
      ) {
        $scope.clients.push($scope.client);
        //$scope.client = {}; destruction de l'objet
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
  .controller("clientController", function($scope, $rootScope, $routeParams, AUTEUR) {
    $scope.lastname = $routeParams.lastname;

    // accès à la propriété clients du $rootScope
    // initialisée dans le mainController
    // problème potentiel : données inacessible au rechargement
    // de la page client (car on n'est pas passé par mainController)
    console.log("clients: " + $rootScope.clients);
    console.log(AUTEUR);

    // rechercher toutes les infos concernant ce client
  });
