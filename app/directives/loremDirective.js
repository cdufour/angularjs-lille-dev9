angular.module("testApp")
  .directive("lorem", function() {

    return {
      restrict: 'A',
      //template: '<div>Lorem ipsum <strong>dolor</strong> sit amet, consectetur adipisicing elit. Eaque distinctio temporibus dicta, ratione hic error, nulla sed, inventore adipisci sunt libero porro. Pariatur eos veritatis impedit, sed repudiandae reprehenderit, incidunt.</div>'
      templateUrl:'app/directives/templates/lorem.html'
    };

  });
