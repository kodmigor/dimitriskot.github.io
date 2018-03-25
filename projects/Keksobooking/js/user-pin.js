'use strict';

(function () {
  // событие активации страницы при отпускании главной метки
  var onMainPinMouseUp = function () {
    window.variables.map.classList.remove('map--faded');
    window.variables.noticeForm.classList.remove('notice__form--disabled');
    window.util.toggleDisabled(window.variables.fieldsets);
    getMainPinCoords(window.constants.MAIN_PIN.COORDS_START);
    window.adFilter.resetAll();
    window.backend.getData(window.adData.loadFromServer, window.util.getInfoPopup);
  };

  // получение координат главной метки
  var getMainPinCoords = function (coords) {
    var formAddress = window.variables.noticeForm.querySelector('#address');
    var mainPinCoords = {
      x: coords.x + window.constants.MAIN_PIN.HALF_WIDTH,
      y: coords.y + window.constants.MAIN_PIN.HEIGHT
    };
    formAddress.value = mainPinCoords.x + ', ' + mainPinCoords.y;
  };

  // событие активации страницы при нажатии Enter
  var onMainPinEnterPress = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      onMainPinMouseUp();
    }
  };

  // функция перетаскивания главной метки
  var dragMainPin = function (event) {
    event.preventDefault();
    var pinCoords = {
      x: window.variables.mainPin.offsetLeft,
      y: window.variables.mainPin.offsetTop
    };
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };
    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();
      var shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY
      };
      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };
      if (window.variables.mainPin.offsetTop - shift.y < window.constants.MAIN_PIN.COORDS_LIMIT.MIN_Y) {
        startCoords.y = window.constants.MAIN_PIN.COORDS_LIMIT.MIN_Y - window.pageYOffset;
        shift.y = 0;
      } else if (window.variables.mainPin.offsetTop - shift.y > window.constants.MAIN_PIN.COORDS_LIMIT.MAX_Y - window.constants.MAIN_PIN.HEIGHT) {
        startCoords.y = window.constants.MAIN_PIN.COORDS_LIMIT.MAX_Y - window.constants.MAIN_PIN.HEIGHT - window.pageYOffset;
        shift.y = 0;
      } else if (window.variables.mainPin.offsetLeft - shift.x < window.constants.MAIN_PIN.COORDS_LIMIT.MIN_X + window.constants.MAIN_PIN.HALF_WIDTH) {
        pinCoords.x = window.constants.MAIN_PIN.COORDS_LIMIT.MIN_X + window.constants.MAIN_PIN.HALF_WIDTH;
        shift.x = 0;
      } else if (window.variables.mainPin.offsetLeft - shift.x > window.constants.MAIN_PIN.COORDS_LIMIT.MAX_X - window.constants.MAIN_PIN.HALF_WIDTH) {
        pinCoords.x = window.constants.MAIN_PIN.COORDS_LIMIT.MAX_X - window.constants.MAIN_PIN.HALF_WIDTH;
        shift.x = 0;
      }
      window.variables.mainPin.style.top = (window.variables.mainPin.offsetTop - shift.y) + 'px';
      window.variables.mainPin.style.left = (window.variables.mainPin.offsetLeft - shift.x) + 'px';
      pinCoords = {
        x: window.variables.mainPin.offsetLeft - shift.x,
        y: window.variables.mainPin.offsetTop - shift.y
      };
      if (!window.variables.map.classList.contains('map--faded')) {
        getMainPinCoords(pinCoords);
      }
    };
    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();
      pinCoords = {
        x: window.variables.mainPin.offsetLeft,
        y: window.variables.mainPin.offsetTop
      };
      window.variables.map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (window.variables.map.classList.contains('map--faded')) {
        onMainPinMouseUp();
      }
      getMainPinCoords(pinCoords);
    };
    window.variables.map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // обработчик события перетаскивания главной метки
  window.variables.mainPin.addEventListener('mousedown', dragMainPin);

  // обработчик события активации страницы при нажатии Enter
  window.variables.mainPin.addEventListener('keydown', onMainPinEnterPress);

  window.userPin = {
    getMainPinCoords: getMainPinCoords,
    onMainPinMouseUp: onMainPinMouseUp,
    onMainPinEnterPress: onMainPinEnterPress
  };
})();
