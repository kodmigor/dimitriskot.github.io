'use strict';

(function () {
  window.constants = {
    map: document.querySelector('.map'),
    mapPinMain: document.querySelector('.map__pin--main'),
    noticeForm: document.querySelector('.notice__form'),
    filters: document.querySelector('.map__filters'),
    fragment: document.createDocumentFragment(),
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    ADS_COUNT: 5,
    PIN_COORDS: {},
    OK_STATUS: 200,
    MIN_PIN_COORD: 125,
    MAX_PIN_COORD: 650,
    adsCollection: []
  };
})();
