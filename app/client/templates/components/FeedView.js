Template.FeedView.helpers({
  crumbs : function(){
    if (!Session.get("feedView")){
      var crumbs = Crumbs.find({userId:Meteor.userId()},{sort:{time:-1}}).fetch();
    } else {
      var crumbs = Crumbs.find({},{sort:{time:-1}}).fetch();
    }

    _.map(crumbs, function(crumb){
      crumb.timestamp = moment(crumb.time).fromNow(true);
      crumb.text = (crumb.type == "text");
      crumb.image = (crumb.type == "image");
      crumb.gif = (crumb.type == "gif");
      crumb.pollData = crumb.poll;
      crumb.poll = (crumb.type == "poll");
      if (crumb.type == "poll"){
        crumb.comments = _.reduce(crumb.pollData, function(memo, obj){ return memo + obj.votes.length; }, 0);
      } else {
        crumb.comments = Comments.find({crumbId: crumb._id}).count();
      }

    });
    return crumbs;
  },
  feedView: function(){
    if (!Session.get("feedView")){
      Meteor.subscribe("crumbs", true, null);
    } else {
      var loc = Geolocation.latLng();
      Meteor.subscribe("crumbs", false, [loc.lng, loc.lat]);
    }
    return Session.get("feedView");
  }
});

Template.FeedView.events({
  "click #mycrumbsToggle": function(){
    Session.set("feedView", false);
  },
  "click #feedToggle": function(){
    Session.set("feedView", true);
  },
  "click #viewCrumb": function(event){
     var c = closest(event.target, function(el){return el.id === 'viewCrumb';});
     var crumbId = c.getAttribute("data-id");
     Session.set("currentCrumb", crumbId);
     Session.set("viewType", "crumb");
  },
  "click #crumbsBackButton": function(){
    Session.set("viewType", "map");
  }
});

function closest(el, fn) {
    return el && (
        fn(el) ? el : closest(el.parentNode, fn)
    );
}
