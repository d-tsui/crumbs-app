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
  }
});

Template.Home.rendered = function(){
  Session.set("viewType", "map");
};
