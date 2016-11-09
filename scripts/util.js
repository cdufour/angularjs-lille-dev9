function isNumeric(val) {
  return !isNaN(val);
}

function isKeyExcluded(excludedKeys, key) {
  // excludedKey: tableau
  for (var i=0; i<excludedKeys.length; i++) {
    // la clé recherchée fait partie du tableau
    // des clés exclues => retourne vrai
    if (excludedKeys[i] === key) return true;
  }
  return false;
}

function isOneFieldEmpty(obj, excludedKeys) {
  for (var key in obj) {
    if (!isKeyExcluded(excludedKeys, key)) {
      if (obj[key] === "") return true;
    }
  }
  return false; // aucun champ n'est vide
}
