'use strict';

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var funBox = {
    lat: 55.734168,
    lng: 37.623938
  };

  var mapOpt = {
    zoom: 16,
    center: funBox
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOpt);
  directionsDisplay.setMap(map);
  directionsDisplay.setOptions({
    suppressMarkers: true,
    preserveViewport: true
  });

  function createMarker(title) {
    var marker = new google.maps.Marker({
      position: map.getCenter(),
      map: map,
      draggable: true
    });
    window.constants.markers.push(marker);
    var contentString = '<h3>' + title + '</h3>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    marker.addListener('dragend', function () {
      getRoute(directionsService, directionsDisplay);
    });
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });
    map.addListener('click', function () {
      if (event.target !== marker) {
        infowindow.close();
      }
    });
    getRoute(directionsService, directionsDisplay);
  };

  function checkKey(event) {
    if (event.keyCode === window.constants.ENTER_KEYCODE && window.constants.editInput.value.length > 0) {
      window.point.createPoint();
    }
  };

  window.constants.editInput.addEventListener('keydown', checkKey);

  // calculateAndDisplayRoute
  function getRoute(directionsService, directionsDisplay) {
    var waypts = [];
    for (var i = 0; i < window.constants.markers.length; i++) {
      waypts.push({
        location: window.constants.markers[i].position,
        stopover: true
      });
    }
    console.log(waypts);

    directionsService.route({
      origin: window.constants.markers[0].position,
      destination: window.constants.markers[window.constants.markers.length - 1].position,
      waypoints: waypts,
      optimizeWaypoints: false,
      travelMode: 'WALKING',
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  window.routeEditor = {
    createMarker: createMarker,
    directionsService: directionsService,
    directionsDisplay: directionsDisplay,
    getRoute: getRoute
  };
}
