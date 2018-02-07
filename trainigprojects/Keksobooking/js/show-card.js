'use strict';

(function () {
  // создание информации об объявлении
  var createPopup = function (array, number) {
    window.constants.fragment.appendChild(window.card.renderPopup(array[number]));
    window.constants.map.appendChild(window.constants.fragment);
    // создание события закрытия окна информации по клику и по нажатию на Enter
    var closePopupButton = window.constants.map.querySelector('.popup__close');
    closePopupButton.addEventListener('click', closeCurrentAd);
    closePopupButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ENTER_KEYCODE) {
        closeCurrentAd(event);
      }
    });
  };

  // удаление класса ..--active у метки
  var deactivatePin = function () {
    if (document.querySelector('.map__pin--active')) {
      var pinActive = document.querySelector('.map__pin--active');
      pinActive.classList.remove('map__pin--active');
    }
  };

  // удаление информации об объявлении
  var closePopup = function () {
    if (document.querySelector('.map__card')) {
      var mapCard = document.querySelector('.map__card');
      window.constants.map.removeChild(mapCard);
    }
  };

  // проверка нажатия клавиши Esc
  var checkKey = function (event) {
    if (event.keyCode === window.constants.ESC_KEYCODE) {
      closeCurrentAd(event);
    }
  };

  // закрытие текущей информации об объявлении
  var closeCurrentAd = function (event) {
    closePopup();
    deactivatePin();
    document.removeEventListener('keydown', checkKey);
    event.stopPropagation();
  };

  // открытие информации об объявлении
  window.openPopup = function (event) {
    var target = event.target;
    var pinId;
    document.addEventListener('keydown', checkKey);
    while (target !== window.constants.map) {
      if (target.className === 'map__pin') {
        closePopup();
        deactivatePin();
        target.classList.add('map__pin--active');
        pinId = target.id.replace('pin-', '');
        window.load(createPopup, window.util.formHandler, pinId);
        return;
      }
      target = target.parentNode;
    }
  };
})();
