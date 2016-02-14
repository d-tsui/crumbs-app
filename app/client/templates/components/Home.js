Template.Home.events({
  "click #crumbsBackButton": function(){
    Session.set("viewType", "map");
  }
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

function closest(el, fn) {
    return el && (
        fn(el) ? el : closest(el.parentNode, fn)
    );
}
