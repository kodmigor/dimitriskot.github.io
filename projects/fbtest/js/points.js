'use strict';

(function () {
  function changePointId() {
    var pointsListItems = window.constants.pointsList.children;
    for (var j = 0; j < pointsListItems.length; j++) {
      pointsListItems[j].id = j;
    }
  };

  function changeMarkers(oldPos, newPos) {
    switch (true) {
      case oldPos < newPos:
      window.constants.markers.splice(+newPos + 1, 0, window.constants.markers[oldPos]);
      window.constants.markers.splice(oldPos, 1);
        break;
      case oldPos > newPos:
      window.constants.markers.splice(newPos, 0, window.constants.markers[oldPos]);
      window.constants.markers.splice(+oldPos + 1, 1);
        break;
    }
  };

  function deletePoint(event) {
    var target = event.target;
    var currentPoint = target.parentNode;
    currentPoint.removeEventListener('dragstart', window.drag.start, false);
    currentPoint.removeEventListener('dragenter', window.drag.enter, false)
    currentPoint.removeEventListener('dragover', window.drag.over, false);
    currentPoint.removeEventListener('dragleave', window.drag.leave, false);
    currentPoint.removeEventListener('drop', window.drag.drop, false);
    currentPoint.removeEventListener('dragend', window.drag.end, false);
    window.constants.pointsList.removeChild(currentPoint);
    for (var i = 0; i < window.constants.markers.length; i++) {
      if (i == currentPoint.id) {
        window.constants.markers[i].setMap(null);
        window.constants.points.splice(i, 1);
        window.constants.markers.splice(i, 1);
        changePointId();
      }
    }
    window.routeEditor.getRoute(window.routeEditor.directionsService, window.routeEditor.directionsDisplay);
  };

  function createPoint() {
    var pointItem = document.createElement('li');
    var pointTitle = document.createElement('p');
    var delButton = document.createElement('button');
    pointTitle.textContent = window.constants.editInput.value;
    delButton.textContent = 'Удалить';
    pointItem.classList.add('editor__list-item');
    pointTitle.classList.add('editor__list-item--title');
    delButton.classList.add('editor__list-item--del');
    window.constants.pointsList.appendChild(pointItem);
    pointItem.appendChild(pointTitle);
    pointItem.appendChild(delButton);
    delButton.addEventListener('click', deletePoint);
    window.constants.points.push(pointItem);
    pointItem.id = window.constants.points.indexOf(pointItem);
    pointItem.draggable = true;
    pointItem.addEventListener('dragstart', window.drag.start, false);
    pointItem.addEventListener('dragenter', window.drag.enter, false)
    pointItem.addEventListener('dragover', window.drag.over, false);
    pointItem.addEventListener('dragleave', window.drag.leave, false);
    pointItem.addEventListener('drop', window.drag.drop, false);
    pointItem.addEventListener('dragend', window.drag.end, false);
    window.routeEditor.createMarker(pointTitle.textContent);
    window.constants.editInput.value = null;
  };

  window.point = {
    changePointId: changePointId,
    changeMarkers: changeMarkers,
    deletePoint: deletePoint,
    createPoint: createPoint
  };
})();
