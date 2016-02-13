// CUSTOMIZED MAP STLYING
var styles = [{"stylers":[{"saturation":-100}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#0099dd"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#aadd55"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"on"}]},{}];

Template.Map.helpers({
  crumbsMapOptions: function() {
    // Make sure the maps API has loaded
    // TODO: DON'T PUT THE API CALL IN THE REACTIVE SECTION
    if (GoogleMaps.loaded() && Geolocation.latLng()) {
      // Map initialization options
      //var toggle = document.getElementById("mapToggle");
      //toggle.style.width = document.getElementById("map-container").offsetWidth + "px";
      var googleLatAndLong = new google.maps.LatLng(Geolocation.latLng().lat, Geolocation.latLng().lng);
      return {  //mapOptions
        center: googleLatAndLong,
        zoom: 18,
        styles:styles,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: false
      };
    }
  }
});

Template.Map.rendered = function() {
  GoogleMaps.load();
  GoogleMaps.ready('crumbsMap', function(map) {

    /*
    map.instance.addListener('bounds_changed', function(e) {
      Session.set("bounds_changed", 1);
    });
    */

    map.instance.markers = []; // array of markers for this end user
    map.instance.placesMarkers = []; // array of markers for places already checked in

    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
      icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });
  });

}
