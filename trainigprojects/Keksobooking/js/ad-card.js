'use strict';

(function () {
  var HOUSE_DICT = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var RUB_SYMBOL = String.fromCharCode(8381);

  // получение характеристик жилища
  var getFeatures = function (adNumber, element) {
    for (var j = 0; j < adNumber.offer.features.length; j++) {
      var item = document.createElement('li');
      item.classList.add('feature');
      item.classList.add('feature--' + adNumber.offer.features[j]);
      window.variables.fragment.appendChild(item);
      element.querySelector('.popup__features').appendChild(window.variables.fragment);
    }
  };

  var getPhotos = function (adNumber, element) {
    var popupPictures = element.querySelector('.popup__pictures');
    if (adNumber.offer.photos.length > 0) {
      for (var j = 0; j < adNumber.offer.photos.length; j++) {
        var item = document.createElement('li');
        var photoLink = document.createElement('a');
        var photo = document.createElement('img');
        window.variables.fragment.appendChild(item);
        item.appendChild(photoLink);
        photoLink.appendChild(photo);
        photoLink.href = adNumber.offer.photos[j];
        photoLink.target = '__blank';
        photo.src = adNumber.offer.photos[j];
        popupPictures.appendChild(item);
      }
    } else {
      element.removeChild(popupPictures);
    }
  };

  // генерация карточки объявления
  var renderAdCard = function (adNumber) {
    var adCard = window.variables.adCardTemplate.cloneNode(true);
    adCard.querySelector('h3').textContent = adNumber.offer.title;
    adCard.querySelector('small').textContent = adNumber.offer.address;
    adCard.querySelector('.popup__price').textContent = adNumber.offer.price + RUB_SYMBOL + '/ночь';
    adCard.querySelector('.popup__type').textContent = HOUSE_DICT[adNumber.offer.type];
    var typeInfo = adNumber.offer.rooms + ' для ' + adNumber.offer.guests;
    adCard.querySelector('.popup__type-info').textContent = (adNumber.offer.guests === 1) ? typeInfo + ' гостя' : typeInfo + ' гостей';
    adCard.querySelector('.popup__check').textContent = 'Заезд после ' + adNumber.offer.checkin + ', выезд до ' + adNumber.offer.checkout;
    getFeatures(adNumber, adCard);
    adCard.querySelector('.popup__description').textContent = adNumber.offer.description;
    adCard.querySelector('.popup__avatar').src = adNumber.author.avatar;
    getPhotos(adNumber, adCard);
    return adCard;
  };

  // создание карточки объявления
  var getAdCard = function (number) {
    window.variables.fragment.appendChild(renderAdCard(window.variables.ads[number]));
    window.variables.map.appendChild(window.variables.fragment);
    // создание события закрытия окна информации по клику и по нажатию на Enter
    var closeAdCardButton = window.variables.map.querySelector('.popup__close');
    closeAdCardButton.addEventListener('click', closeCurrentAdCard);
    closeAdCardButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ENTER_KEYCODE) {
        closeCurrentAdCard(event);
      }
    });
  };

  // закрытие карточки объявления
  var closeAdCard = function () {
    if (document.querySelector('.map__card')) {
      var mapCard = document.querySelector('.map__card');
      window.variables.map.removeChild(mapCard);
    }
  };

  // закрытие текущей карточки объявления
  var closeCurrentAdCard = function (event) {
    closeAdCard();
    window.pins.deactivatePin();
    document.removeEventListener('keydown', window.pins.onPinEscPress);
    event.stopPropagation();
  };

  window.adCard = {
    render: renderAdCard,
    display: getAdCard,
    hide: closeAdCard,
    hideCurrent: closeCurrentAdCard
  };
})();
