'use strict';

(function () {
  var timeIn = window.constants.noticeForm.querySelector('#timein');
  var timeOut = window.constants.noticeForm.querySelector('#timeout');
  var firstTimes = timeIn.children;
  var secondTimes = timeOut.children;
  var type = window.constants.noticeForm.querySelector('#type');
  var price = window.constants.noticeForm.querySelector('#price');
  var formTypes = type.children;
  var roomNumber = window.constants.noticeForm.querySelector('#room_number');
  var capacity = window.constants.noticeForm.querySelector('#capacity');
  var formAddress = window.constants.noticeForm.querySelector('#address');
  var MAIN_PIN_HALF_WIDTH = 31;
  var MAIN_PIN_HEIGHT = 82;

  var minPricesForType = [
    '1000',
    '0',
    '5000',
    '10000'
  ];

  var roomCapacity = {
    '1': [
      {value: 1, text: 'для 1 гостя'}
    ],
    '2': [
      {value: 1, text: 'для 1 гостя'},
      {value: 2, text: 'для 2 гостей'}
    ],
    '3': [
      {value: 1, text: 'для 1 гостя'},
      {value: 2, text: 'для 2 гостей'},
      {value: 3, text: 'для 3 гостей'}
    ],
    '100': [
      {value: 0, text: 'не для гостей'}
    ]
  };

  var syncElement = function (element, item) {
    element.value = item.value;
  };

  var syncMinPrice = function (element, item) {
    element.min = item;
    element.placeholder = element.min;
  };

  var timeInSync = function () {
    window.synchronizeFields(timeOut, firstTimes, secondTimes, syncElement);
  };

  var timeOutSync = function () {
    window.synchronizeFields(timeIn, secondTimes, firstTimes, syncElement);
  };

  var typeSync = function () {
    window.synchronizeFields(price, formTypes, minPricesForType, syncMinPrice);
  };


  // очистка capacity
  var clearCapacity = function () {
    while (capacity.firstChild) {
      capacity.removeChild(capacity.firstChild);
    }
  };

  // генерация значения для capacity
  var renderCapacity = function (value) {
    for (var i = 0; i < roomCapacity[value].length; i++) {
      var capacityItem = document.createElement('option');
      capacityItem.textContent = roomCapacity[value][i].text;
      capacityItem.value = roomCapacity[value][i].value;
      capacity.appendChild(capacityItem);
    }
  };

  // синхронизация количества комнат с количеством гостей
  var getCapacities = function () {
    var roomNumbers = roomNumber.children;
    clearCapacity();
    for (var i = 0; i < roomNumbers.length; i++) {
      if (roomNumbers[i].selected) {
        renderCapacity(roomNumber.value);
      }
    }
  };

  var syncForm = function () {
    timeInSync();
    typeSync();
    getCapacities();
  };

  syncForm();

  timeIn.addEventListener('change', timeInSync);
  timeOut.addEventListener('change', timeOutSync);
  type.addEventListener('change', typeSync);
  roomNumber.addEventListener('change', getCapacities);

  var getFormAddress = function (coords) {
    var pinX = coords.x + MAIN_PIN_HALF_WIDTH;
    var pinY = coords.y + MAIN_PIN_HEIGHT;
    formAddress.value = pinX + ', ' + pinY;
  };

  var resetForm = function () {
    window.constants.noticeForm.reset();
    syncForm();
    window.util.formHandler('Данные успешно отправлены!');
    getFormAddress(window.constants.PIN_COORDS);
    window.constants.mapPinMain.style.left = window.constants.PIN_COORDS.x + 'px';
    window.constants.mapPinMain.style.top = window.constants.PIN_COORDS.y + 'px';
  };

  window.constants.noticeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    window.upload(new FormData(window.constants.noticeForm), resetForm, window.util.formHandler);
  });

  window.form = {
    getFormAddress: getFormAddress
  };
})();
