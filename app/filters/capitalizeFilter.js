angular.module("testApp")
  .filter("capitalize", function() {

    return function(item) {
      // item correspond à l'élément situé à gauche du caractère '|'
      // dans l'appel côté template
      var firstLetter = item[0];
      var names = item.split(" "); // retourne un tableau de valeurs, sépérateur: espace

      if (names.length > 1) {
        var namesCapitalized = "";
        names.forEach(function(name) {
          namesCapitalized += name.charAt(0).toUpperCase() + name.substring(1) + " ";
        });
        return namesCapitalized;
      } else {
        return firstLetter.toUpperCase() + item.substring(1);
      }
    };

  });
