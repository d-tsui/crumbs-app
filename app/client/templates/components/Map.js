// CUSTOMIZED MAP STLYING
var styles = [{"stylers":[{"saturation":-100}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#0099dd"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#aadd55"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"on"}]},{}];

var drawMarkers = function(){
  var map = GoogleMaps.maps.crumbsMap;
  var crumbs = Crumbs.find().fetch();
  _.each(crumbs, function(crumb){
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(crumb.geo[1], crumb.geo[0]),
      map: map.instance,
      title: crumb._id,
      icon:'img/OrangeMarker.png'
    });
    map.instance.markers.push(marker);
  });
}

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

    // Add a marker to the map once it's ready
    /*var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
      icon:'img/BlueMarker.png'
    });*/

    // Add circle overlay and bind to marker
    var radius = new google.maps.Circle({
      map: map.instance,
      radius: 50,    // radius in meters
      strokeWeight: 1,
      strokeColor: "rgba(255,255,255,255)",
      strokeOpacity: 0.8,
      fillColor: "rgba(255,255,255,250)",
      center: map.options.center
    });

    var circle = new google.maps.Circle({
      map: map.instance,
      radius: 3,    // radius in meters
      strokeWeight: 3,
      strokeColor: "rgb(0,77,255)",
      fillColor: "rgb(0,109,255)",
      center: map.options.center
    });

    Deps.autorun(function() {
      drawMarkers();
    });
  });

}
