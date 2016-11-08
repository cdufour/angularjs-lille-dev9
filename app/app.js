// déclaration du module principal
angular.module("testApp", []);

// variante déclarative
// var app = angular.module("testApp", []);

// déclaration d'un controller
angular.module("testApp")
  .controller("mainController", function($scope) {

    $scope.titre = "Formation Angular";
    $scope.clients = [
      {name:'Roberto', age:78, country:'Italie'},
      {name:'Hanz', age:32, country:'Allemagne'},
      {name:'Giorgio', age:45, country:'Italie'},
      {name:'Manuel', age:8, country:'France'},
      {name:'Etienne', age:23, country:'France'},
      {name:'David', age:65, country:'Italie'}
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

  })
  .controller("menuController", function($scope) {
    $scope.menus = [
      {label:"Accueil", url:"/"},
      {label:"Clients", url:"/clients"},
      {label:"Aide", url:"/aide.html"}
    ];
  });
