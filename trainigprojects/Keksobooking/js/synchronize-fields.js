'use strict';

(function () {
  // функция синхронизации двух полей
  // принимает на вход параметры:
  // secondElement - вторая (синхронизируемая) форма
  // firstArray - массив значений первой формы
  // secondArray - массив значений второй формы
  // (порядок значений двух массивов изначально составлен в нужном по ТЗ порядке)
  // callback - функция-колбэк
  window.synchronizeFields = function (secondElement, firstArray, secondArray, callback) {
    // перебираем значения первой формы
    for (var i = 0; i < firstArray.length; i++) {
      // и если одно из них выбрано пользователем
      if (firstArray[i].selected) {
        // присваеваем переменной item элемент второго массива
        // расположенный под тем же порядковым номером, что и выбранынй элемент первого массива
        var item = secondArray[i];
        // и если передаваемое значение в callback является функцией,
        if (typeof callback === 'function') {
          // то вызываем ёё, передавая параметрами вторую форму и item
          callback(secondElement, item);
        }
      }
    }
  };
})();
