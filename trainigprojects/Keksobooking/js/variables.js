'use strict';

(function () {
  window.variables = {
    map: document.querySelector('.map'),
    mainPin: document.querySelector('.map__pin--main'),
    fieldsets: document.querySelectorAll('fieldset'),
    adCardTemplate: document.querySelector('template').content.querySelector('.map__card'),
    fragment: document.createDocumentFragment(),
    pinTemplate: document.querySelector('template').content.querySelector('.map__pin'),
    noticeForm: document.querySelector('.notice__form'),
    photoContainer: document.querySelector('.form__photo-container'),
    photoPreview: document.querySelector('#user-images'),
    avatarPreview: document.querySelector('.notice__preview').querySelector('img'),
    ads: [],
    adsOnMap: []
  };
})();
