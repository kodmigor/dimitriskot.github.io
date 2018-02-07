'use strict';

(function () {
  // получение случайного элемента массива
  var getRandomElement = function (array) {
    var randomElement = array[Math.floor(Math.random() * array.length)];
    return randomElement;
  };

  // получение случайной длины массива
  var getRandomArrayLength = function (array) {
    var randomArrayLength = Math.ceil(Math.random() * array.length);
    return randomArrayLength;
  };

  // получение случайного числа
  var getRandomNumber = function (count) {
    var number = Math.ceil(Math.random() * count);
    return number;
  };

  // получение случайного числа из диапазона
  var getRandomNumberFromRange = function (min, max) {
    var number = Math.floor(Math.random() * (max - min) + min);
    return number;
  };

  var formHandler = function (message) {
    var formPopup = document.createElement('div');
    formPopup.classList.add('form-popup');
    formPopup.textContent = message;
    document.body.insertAdjacentElement('afterbegin', formPopup);
    var formButton = document.createElement('button');
    formButton.classList.add('form-popup__button');
    formButton.textContent = 'OK';
    var closePopup = function () {
      document.body.removeChild(formPopup);
    };
    formButton.addEventListener('click', closePopup);
    formPopup.appendChild(formButton);
  };

  var debounce = function (debouncedFunction) {
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      debouncedFunction();
    }, 1000);
  };

  window.util = {
    getRandomElement: getRandomElement,
    getRandomArrayLength: getRandomArrayLength,
    getRandomNumber: getRandomNumber,
    getRandomNumberFromRange: getRandomNumberFromRange,
    formHandler: formHandler,
    debounce: debounce
  };
})();
