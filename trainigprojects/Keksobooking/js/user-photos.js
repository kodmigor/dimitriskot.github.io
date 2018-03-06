'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PRECEDING_POSITION = 2;

  var avatarChooser = document.querySelector('#avatar');
  var photoChooser = document.querySelector('#images');
  var avatarDropZone = document.querySelector('.notice__photo .drop-zone');
  var photoDropZone = document.querySelector('.form__photo-container .drop-zone');
  var draggedItem = null;
  var position = null;
  var oldPhoto = null;

  var getUserImages = function (file, evt) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        if (evt.target === avatarChooser || evt.target === avatarDropZone) {
          window.variables.avatarPreview.src = reader.result;
        } else if (evt.target === photoChooser || evt.target === photoDropZone) {
          var photo = document.createElement('img');
          window.variables.photoPreview.classList.add('images__preview');
          window.variables.photoPreview.appendChild(photo);
          photo.classList.add('user-photo');
          photo.src = reader.result;
        }
      });
      reader.readAsDataURL(file);
    }
  };

  var onUserAvatarChange = function (evt) {
    var file = avatarChooser.files[0];
    getUserImages(file, evt);
  };

  var ontUserPhotosChange = function (evt) {
    var file = photoChooser.files[0];
    getUserImages(file, evt);
  };

  var onUserImageDrop = function (evt) {
    evt.preventDefault();
    var file = evt.dataTransfer.files[0];
    getUserImages(file, evt);
  };

  avatarChooser.addEventListener('change', onUserAvatarChange);

  avatarDropZone.addEventListener('drop', onUserImageDrop);
  avatarDropZone.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  });
  avatarDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  photoChooser.addEventListener('change', ontUserPhotosChange);

  photoDropZone.addEventListener('drop', onUserImageDrop);
  photoDropZone.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  });
  photoDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  window.variables.photoPreview.addEventListener('dragstart', function (evt) {
    draggedItem = evt.target;
  });

  window.variables.photoPreview.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  });

  window.variables.photoPreview.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  window.variables.photoPreview.addEventListener('drop', function (evt) {
    position = draggedItem.compareDocumentPosition(evt.target);
    oldPhoto = window.variables.photoPreview.replaceChild(draggedItem, evt.target);
    if (position === PRECEDING_POSITION) {
      window.variables.photoPreview.insertBefore(oldPhoto, draggedItem.nextSibling);
    } else {
      window.variables.photoPreview.insertBefore(oldPhoto, draggedItem);
    }
    evt.preventDefault();
  });
})();
