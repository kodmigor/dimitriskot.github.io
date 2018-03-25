'use strict';

(function () {
  var DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var LOAD_TIMEOUT = 5000;
  var OK_STATUS = 200;
  var ERROR_STATUS = {
    '404': 'Запрашиваемый ресур не найден',
    '500': 'Внутренняя ошибка сервера'
  };

  var getXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = LOAD_TIMEOUT;
    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Код ответа: ' + xhr.status + ' ' + xhr.statusText + ERROR_STATUS[xhr.status]);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Сервер не отвечает в течение ' + xhr.timeout / 1000 + ' с');
    });
    return xhr;
  };

  var getData = function (onLoad, onError) {
    var xhr = getXhr(onLoad, onError);
    xhr.open('GET', DOWNLOAD_URL);
    xhr.send();
  };

  var sendData = function (data, onLoad, onError) {
    var xhr = getXhr(onLoad, onError);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    getData: getData,
    sendData: sendData
  };
})();
