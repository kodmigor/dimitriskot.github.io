'use strict';

(function () {
  var loadAds = function (collection) {
    window.constants.adsCollection = collection;
    window.pin.createPins(collection);
  };

  window.filter = {
    loadAds: loadAds,
  };
})();
