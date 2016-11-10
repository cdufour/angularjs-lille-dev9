angular.module("testApp")
  .directive("client", function() {

    var controller = function($scope) {
      $scope.isVisible = true;
    };

    var link = function(scope, element, attrs) {
      var input = '<input type="text">';
      element.find('p').html(input);
    };

    return {
      restrict: "E",
      templateUrl : 'app/directives/templates/clientTemplate.html',
      scope: {
        message: '@',
        data:'='
      },
      controller: controller,
      link: link
    };

  });
