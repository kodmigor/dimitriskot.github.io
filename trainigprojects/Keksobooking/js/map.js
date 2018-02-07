'use strict';

(function () {


  // функция активации редактора объявления
  var activateEdit = function () {
    window.constants.map.classList.remove('map--faded');
    window.constants.noticeForm.classList.remove('notice__form--disabled');
    window.load(window.filter.loadAds, window.util.formHandler);
    var defaultCoords = {
      x: window.constants.mapPinMain.offsetLeft,
      y: window.constants.mapPinMain.offsetTop
    };
    window.constants.PIN_COORDS = defaultCoords;
    window.form.getFormAddress(defaultCoords);
    window.constants.mapPinMain.removeEventListener('mouseup', activateEdit);
    window.constants.mapPinMain.addEventListener('mousedown', dragPinMain);
  };

  // событие активации редактора объявления по клику
  window.constants.mapPinMain.addEventListener('mouseup', activateEdit);

  // событие активации редактора объявления по нажатию Enter
  window.constants.mapPinMain.addEventListener('keydown', function (event) {
    if (event.keyCode === window.constants.ENTER_KEYCODE) {
      activateEdit();
    }
  });

  // событие открытия информации об объявлении по клику
  window.constants.map.addEventListener('click', window.openPopup);

  // событие открытия информации об объявлении по нажатию Enter
  window.constants.map.addEventListener('keydown', function (event) {
    if (event.keyCode === window.constants.ENTER_KEYCODE) {
      window.openPopup(event);
    }
  });

  var dragPinMain = function (event) {
    event.preventDefault();
    var pinCoords;
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
      if (window.constants.mapPinMain.offsetTop - shift.y < window.constants.MIN_PIN_COORD) {
        window.constants.mapPinMain.style.top = window.constants.MIN_PIN_COORD + 'px';
      } else if (window.constants.mapPinMain.offsetTop - shift.y > window.constants.MAX_PIN_COORD) {
        window.constants.mapPinMain.style.top = window.constants.MAX_PIN_COORD + 'px';
      }
      window.constants.mapPinMain.style.top = (window.constants.mapPinMain.offsetTop - shift.y) + 'px';
      window.constants.mapPinMain.style.left = (window.constants.mapPinMain.offsetLeft - shift.x) + 'px';
      pinCoords = {
        x: window.constants.mapPinMain.offsetLeft - shift.x,
        y: window.constants.mapPinMain.offsetTop - shift.y
      };
    };
    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();
      window.constants.map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.form.getFormAddress(pinCoords);
    };
    window.constants.map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
})();
