'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 3000;
    xhr.addEventListener('load', function () {
      if (xhr.status === window.constants.OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('POST', URL);
    xhr.send(data);
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Сервер не отвечает в течение ' + xhr.timeout / 1000 + ' с');
    });
    return xhr;
  };

  window.load = function (onLoad, onError, number) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 5000;
    xhr.open('GET', URL + '/data');
    xhr.addEventListener('load', function () {
      if (xhr.status === window.constants.OK_STATUS) {
        onLoad(xhr.response, number);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.send();
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Сервер не отвечает в течение ' + xhr.timeout / 1000 + ' с');
    });
    return xhr;
  };
})();
