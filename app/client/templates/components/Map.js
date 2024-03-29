// CUSTOMIZED MAP STLYING
var styles = [{"stylers":[{"saturation":-100}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#0099dd"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#aadd55"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"on"}]},{}];

var drawMarkers = function(){
  var map = GoogleMaps.maps.crumbsMap;

  var markers = map.instance.markers;
  for (var i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }

  var loc = Geolocation.latLng();
  var crumbs = Crumbs.find().fetch();
  _.each(crumbs, function(crumb){
    var icon = "";
    if (crumb.type == "text"){
      icon = 'img/BlueMarker.png';
    } else if (crumb.type == "image"){
      icon = 'img/OrangeMarker.png'
    } else if (crumb.type == "gif"){
      icon = 'img/PurpleMarker.png'
    } else if (crumb.type == "poll"){
      icon = 'img/GreenMarker.png'
    }
    console.log(_.findWhere(map.instance.markers, {title: crumb._id}));
    if (!(_.findWhere(map.instance.markers, {title: crumb._id}))){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(crumb.geo[1], crumb.geo[0]), map: map.instance, title: crumb._id, icon:icon
      });
      map.instance.markers.push(marker);
      console.log(marker);
    }

  });
  /*
  var crumbsFar = Crumbs.find().fetch();
  _.each(crumbsFar, function(crumb){
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(crumb.geo[1], crumb.geo[0]), map: map.instance, title: crumb._id, icon:'img/GrayMarker.png'
    });
    map.instance.markers.push(marker);
  });
  */
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
  Session.set("mapLoading", true);
  GoogleMaps.load();
  GoogleMaps.ready('crumbsMap', function(map) {
    Session.set("mapLoading", false);
    /*
    map.instance.addListener('bounds_changed', function(e) {
      Session.set("bounds_changed", 1);
    });
    */

    map.instance.markers = []; // array of markers for this end user

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

    Deps.autorun(function() {
      drawMarkers();
    });
    Deps.autorun(function(){
      var loc = Geolocation.latLng();
      var googleLatAndLong = new google.maps.LatLng(loc.lat, loc.lng);
      map.instance.panTo(googleLatAndLong);
    });
  });

}
