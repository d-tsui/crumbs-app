Router.configure({
  // 'layout' template defintes layout for entire app
  layoutTemplate: 'AppBody',
  // 'loading' template is used when app is loading
  loadingTemplate: 'AppLoading'
});

dataReadyHold = null;

if (Meteor.isClient) {

};

Meteor.startup(function () {
  if (Meteor.isClient) {
    dataReadyHold = LaunchScreen.hold();
    Geolocation.latLng();
    GoogleMaps.load();
  };
});

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  getGeo = Meteor.setInterval(function() {
    if(Geolocation.latLng()){
      Meteor.clearInterval(getGeo);
      dataReadyHold.release();
    }
  }, 500);

  Deps.autorun(function() {
    if (Meteor.user()){
      var loc = Geolocation.latLng();
      if (loc){
        Meteor.subscribe("crumbs", true, [loc.lng, loc.lat]);
      }
    }
  });

  Meteor.subscribe("comments");
  Meteor.subscribe("notifications");
};

Router.map(function() {
  this.route('Home', {
    path: '/',
    onBeforeAction: function (pause) {
      this.next();
    }
  });

  this.route('Feed', {
    path: '/feed',
    onBeforeAction: function (pause) {
      this.next();
    }
  });

  this.route('Login', {
    path: '/login',
    layoutTemplate: 'AppFullScreen',
    onBeforeAction: function (pause) {
      if (Meteor.user()) {
        Router.go('Home');
      } else {
        this.next();
      }
    }
  });

  this.route('/crumb/:_id', {
    name: 'Crumb',
    template: 'Crumb',
    action: function () {
      this.render();
    }
  });
});

var requireLogin = function() {
  if (! Meteor.user()) {
    Router.go('/login');
  } else {
    this.next();
  }
}

// Before a route loads, redirect if user not logged in (except for login page)
Router.onBeforeAction(requireLogin, {except: ['Login']});
