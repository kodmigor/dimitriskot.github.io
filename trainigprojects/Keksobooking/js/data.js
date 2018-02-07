'use strict';

(function () {
  var adsCount = 8;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var PIN_HALF_WIDTH = 20;
  var PIN_HEIGHT = 62;
  var MIN_X = 300 + PIN_HALF_WIDTH;
  var MAX_X = 900 - PIN_HALF_WIDTH;
  var MIN_Y = 100 + PIN_HEIGHT;
  var MAX_Y = 500 - PIN_HEIGHT;

  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var types = [
    'flat',
    'house',
    'bungalo'
  ];

  var checkinTimes = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var checkoutTimes = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var featuresList = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  // получение пути к файлу с аватаркой
  var getAvatarPath = function (userNumber) {
    var avatarPath = 'img/avatars/user';
    avatarPath += (userNumber < 10 ? '0' : '') + userNumber + '.png';
    return avatarPath;
  };

  // получение author.avatar
  var getAvatar = function (number) {
    var avatars = [];
    avatars[number] = getAvatarPath(number + 1);
    return avatars[number];
  };

  // получение ad.author
  var getAuthor = function (number) {
    return {
      avatar: getAvatar(number)
    };
  };

  // получение случайной координаты
  var getRandomLocation = function () {
    var randomLocation = {};
    randomLocation.x = window.util.getRandomNumberFromRange(MIN_X, MAX_X);
    randomLocation.y = window.util.getRandomNumberFromRange(MIN_Y, MAX_Y);
    return randomLocation;
  };

  // получение offer.title
  var getTitle = function (number) {
    var tempTitles = titles.slice();

    function compareRandom() {
      return Math.random() - 0.5;
    }
    tempTitles.sort(compareRandom);
    return tempTitles[number];
  };

  // получение offer.type
  var getType = function () {
    var type = window.util.getRandomElement(types);
    return type;
  };

  // получение offer.features
  var getFeatures = function () {
    var features = featuresList.slice();

    function compareRandom() {
      return Math.random() - 0.5;
    }
    features.sort(compareRandom);
    features.length = window.util.getRandomArrayLength(featuresList);
    return features;
  };

  // получение offer
  var getOffer = function (number, location) {
    var roomsCount = 5;
    var guestsCount = 10;
    var offer = {};
    offer.title = getTitle(number);
    offer.address = location.x + ', ' + location.y;
    offer.price = window.util.getRandomNumberFromRange(MIN_PRICE, MAX_PRICE);
    offer.type = getType();
    offer.rooms = window.util.getRandomNumber(roomsCount);
    offer.guests = window.util.getRandomNumber(guestsCount);
    offer.checkin = window.util.getRandomElement(checkinTimes);
    offer.checkout = window.util.getRandomElement(checkoutTimes);
    offer.features = getFeatures();
    offer.description = '';
    offer.photos = [];
    return offer;
  };

  // создание объявления
  var getAd = function (number) {
    var ad = {};
    var tempLocation = getRandomLocation();
    ad.author = getAuthor(number);
    ad.offer = getOffer(number, tempLocation);
    ad.location = tempLocation;
    return ad;
  };

  // получение массива объявлений
  var getAds = function (count) {
    var adsArray = [];
    for (var i = 0; i < count; i++) {
      adsArray[i] = getAd(i, count);
    }
    return adsArray;
  };

  // создание массива объявлений
  window.data = {
    ads: getAds(adsCount)
  };
})();
