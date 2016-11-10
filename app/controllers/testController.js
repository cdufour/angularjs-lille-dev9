var testController = function($scope) {
  $scope.titre = "Page de test";

  $scope.message ="coucou à tous";

  $scope.clients = [
        {
          name:'Roberto',
          lastname:'Baggio',
          age:78,
          country:'Italie',
          images:['deniro.jpg', 'baggio.jpg', 'beckham.jpg']
        },
        {
          name:'hanz',
          lastname:'muller',
          age:32,
          country:'Allemagne',
          images:['deniro.jpg', 'baggio.jpg', 'beckham.jpg']
        },
        {name:'Giorgio paulo', lastname:'Chiellini', age:45, country:'Italie', images:['deniro.jpg', 'baggio.jpg', 'beckham.jpg']},
        {name:'Manuel', lastname:'Neur', age:8, country:'France', images:['deniro.jpg', 'baggio.jpg', 'beckham.jpg']},
        {name:'etienne', lastname:'marcel paul vincent', age:23, country:'France', images:['deniro.jpg', 'baggio.jpg', 'beckham.jpg']},
        {name:'David', lastname:'Beckham', age:65, country:'Italie', images:['deniro.jpg', 'baggio.jpg', 'beckham.jpg']}
      ];
};

// technique pour éviter le problème de la minification
testController.$inject = ['$scope'];

angular.module("testApp")
  .controller("testController", testController);
