
Template.Home.events({

});

Template.Home.helpers({
  feedView: function(){
    return Session.get("viewType") == "feed";
  },
  crumbView: function(){
    return Session.get("viewType") == "crumb";
  },
  mapView: function(){
    return Session.get("viewType") == "map";
  },
  gifView: function(){
    return Session.get("viewType") == "gif";
  }
});

Template.Home.rendered = function(){
  if (! Meteor.user()) {
    Router.go('/login');
  }
  Session.set("viewType", "map");
};
