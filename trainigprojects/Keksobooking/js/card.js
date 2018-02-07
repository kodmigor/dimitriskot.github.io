'use strict';

(function () {
  var articleTemplate = document.querySelector('template').content.querySelector('.map__card');

  var dictTypes = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  // очистка features в шаблоне
  var clearFeatures = function () {
    var features = articleTemplate.querySelector('.popup__features');
    while (features.firstChild) {
      features.removeChild(features.firstChild);
    }
  };

  // генерация информации об объявлении
  var renderPopup = function (adNumber) {
    clearFeatures();
    var article = articleTemplate.cloneNode(true);
    article.querySelector('h3').textContent = adNumber.offer.title;
    article.querySelector('small').textContent = adNumber.offer.address;
    article.querySelector('.popup__price').textContent = adNumber.offer.price + String.fromCharCode(8381) + '/ночь';
    article.querySelector('.popup__type').textContent = dictTypes[adNumber.offer.type];
    var typeInfo = adNumber.offer.rooms + ' для ' + adNumber.offer.guests;
    article.querySelector('.popup__type-info').textContent = (adNumber.offer.guests === 1) ? typeInfo + ' гостя' : typeInfo + ' гостей';
    article.querySelector('.popup__check').textContent = 'Заезд после ' + adNumber.offer.checkin + ', выезд до ' + adNumber.offer.checkout;
    for (var i = 0; i < adNumber.offer.features.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.className = 'feature';
      featureItem.classList.add('feature--' + adNumber.offer.features[i]);
      window.constants.fragment.appendChild(featureItem);
      article.querySelector('.popup__features').appendChild(window.constants.fragment);
    }
    article.querySelector('.popup__description').textContent = adNumber.offer.description;
    article.querySelector('.popup__avatar').src = adNumber.author.avatar;
    return article;
  };

  window.card = {
    renderPopup: renderPopup
  };
})();
