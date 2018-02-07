'use strict';

(function () {
  var dragElement = null;

  function handleDragStart(event) {
    this.style.opacity = '0.4';
    dragElement = this;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(event) {
    if (event.preventDefault) {
      event.preventDefault();
    }
    event.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter(event) {
    this.classList.add('editor__list-item--over');
  }

  function handleDragLeave(event) {
    this.classList.remove('editor__list-item--over');
  }

  function handleDrop(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    if (dragElement != this) {
      switch (true) {
        case dragElement.id < this.id:
          window.constants.pointsList.insertBefore(dragElement, this.nextSibling);
          window.point.changeMarkers(dragElement.id, this.id);
          break;
        case dragElement.id > this.id:
          window.constants.pointsList.insertBefore(dragElement, this);
          window.point.changeMarkers(dragElement.id, this.id);
          break;
      }
      window.point.changePointId();
    }
    return false;
  }

  function handleDragEnd(event) {
    window.point.changePointId();
    window.constants.points.forEach.call(window.constants.points, function (point) {
      point.classList.remove('editor__list-item--over');
      point.style.opacity = '1';
    });
    window.routeEditor.getRoute(window.routeEditor.directionsService, window.routeEditor.directionsDisplay);
  }
  window.drag = {
    start: handleDragStart,
    over: handleDragOver,
    enter: handleDragEnter,
    leave: handleDragLeave,
    drop: handleDrop,
    end: handleDragEnd
  };
})();
