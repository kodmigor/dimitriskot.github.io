'use strict';

(function () {
  var COUNT_ROOMS = 5;
  var COUNT_GUESTS = 10;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var AD_INFO_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var HOUSE_TYPES = [
    'flat',
    'house',
    'bungalo'
  ];
  var CHECK_IN_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var CHECK_OUT_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var FEATURES_LIST = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var MAP_BORDER_COORDS = {
    minX: 300 + window.constants.PIN_HALF_WIDTH,
    maxX: 900 - window.constants.PIN_HALF_WIDTH,
    minY: 100 + window.constants.PIN_HEIGHT,
    maxY: 500 - window.constants.PIN_HEIGHT
  };

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

  // получение информации об объявлении
  var GetOffer = function (location) {
    this.title = window.util.getRandomArrayElement(AD_INFO_TITLES);
    this.address = location.x + ', ' + location.y;
    this.price = window.util.getRandomNumberFromRange(MIN_PRICE, MAX_PRICE);
    this.type = window.util.getRandomArrayElement(HOUSE_TYPES);
    this.rooms = window.util.getRandomNumberFromRange(1, COUNT_ROOMS);
    this.guests = window.util.getRandomNumberFromRange(1, COUNT_GUESTS);
    this.checkin = window.util.getRandomArrayElement(CHECK_IN_TIMES);
    this.checkout = window.util.getRandomArrayElement(CHECK_OUT_TIMES);
    this.features = window.util.getRandomArrayFromExisting(FEATURES_LIST);
    this.description = '';
    this.photos = [];
  };

  // создание объявления
  var getAd = function (number) {
    var ad = {};
    var tempLocation = window.util.getRandomLocation(MAP_BORDER_COORDS);
    ad.author = getAuthor(number);
    ad.offer = new GetOffer(tempLocation);
    ad.location = tempLocation;
    return ad;
  };

  // создание массива объявлений
  var getAds = function (count) {
    var tempAds = [];
    for (var i = 0; i < count; i++) {
      tempAds[i] = getAd(i);
    }
    return tempAds;
  };

  // функция создания массива объявлений из загруженных с сервера данных
  var loadAds = function (collection) {
    window.variables.ads = collection;
    window.variables.ads.map(function (ad, index) {
      ad.id = index;
      return ad;
    });
    window.variables.adsOnMap = window.variables.ads.slice();
    window.pins.renderPins(window.variables.adsOnMap);
  };

  window.adData = {
    render: getAds,
    loadFromServer: loadAds
  };
})();
