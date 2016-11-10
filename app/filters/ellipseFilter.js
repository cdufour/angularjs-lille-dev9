angular.module("testApp")
  .filter("ellipse", function() {
    return function(item, nbChars, symbol) {
      return (item.length > nbChars) ? item.substring(0, nbChars) + symbol : item;
    };
  });
