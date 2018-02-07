'use strict';

(function () {
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPinSet = window.constants.map.querySelector('.map__pins');

  // генерация метки
  var renderMapPin = function (ad, number) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.style.top = ad.location.y + 'px';
    mapPinElement.style.left = ad.location.x + 'px';
    mapPinElement.id = 'pin-' + number;
    mapPinElement.querySelector('img').src = ad.author.avatar;
    return mapPinElement;
  };
  /*
    // создание меток объявлений
    var createPins = function (collection) {
      var pins = [];
      for (var i = 0; i < window.constants.ADS_COUNT; i++) {
        pins[i] = window.constants.fragment.appendChild(renderMapPin(collection[i], collection.indexOf(collection[i])));
      }
      mapPinSet.appendChild(window.constants.fragment);
    };
  */

  // создание меток объявлений
  var createPins = function (collection) {
    var pins = collection.slice(0, window.constants.ADS_COUNT);
    pins.forEach(function (pin) {
      window.constants.fragment.appendChild(renderMapPin(pin, collection.indexOf(pin)));
      mapPinSet.appendChild(window.constants.fragment);
    });
  };

  var removePins = function () {
    var pinsOnMap = mapPinSet.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinsOnMap.forEach(function (pin) {
      mapPinSet.removeChild(pin);
    });
  };

  window.pin = {
    renderMapPin: renderMapPin,
    createPins: createPins,
    removePins: removePins,
  };
})();
