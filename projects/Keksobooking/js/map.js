'use strict';

(function () {
  // событие открытия информации об объявлении по клику
  window.variables.map.addEventListener('click', window.pins.onPinClick);

  // событие открытия информации об объявлении по нажатию Enter
  window.variables.map.addEventListener('keydown', window.pins.onPinEnterPress);
})();
