Router.configure({
  // 'layout' template defintes layout for entire app
  layoutTemplate: 'AppBody',
  // 'loading' template is used when app is loading
  loadingTemplate: 'AppLoading'
});

dataReadyHold = null;

Meteor.startup(function () {
  if (Meteor.isClient) {
    dataReadyHold = LaunchScreen.hold();
    Meteor.subscribe("crumbs");
    Meteor.subscribe("comments");
    Meteor.subscribe("notifications");
    Geolocation.latLng();
    GoogleMaps.load();
    dataReadyHold.release();
  }
});

Router.map(function() {
  this.route('Home', {
    path: '/',
    layoutTemplate: 'AppFullScreen',
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
