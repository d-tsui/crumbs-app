Template.Home.events({
  "click #crumbsBackButton": function(){
    Session.set("viewType", "map");
  },
  "click #viewCrumb": function(event){
     var c = closest(event.target, function(el){return el.id === 'viewCrumb';});
     var crumbId = c.getAttribute("data-id");
     Session.set("currentCrumb", crumbId);
     Session.set("viewType", "crumb");
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
