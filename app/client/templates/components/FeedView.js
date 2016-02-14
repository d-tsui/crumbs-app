Template.FeedView.helpers({
  crumbs : function(){
    var crumbs = Crumbs.find({},{sort:{time:-1}}).fetch();
    _.map(crumbs, function(crumb){
      crumb.timestamp = moment(crumb.time).fromNow(true);
      crumb.text = (crumb.type == "text");
      crumb.image = (crumb.type == "image");
      crumb.comments = Comments.find({crumbId: crumb._id}).count();
    });
    return crumbs;
  },
  feedView: function(){
    if (!Session.get("feedView")){
      Meteor.subscribe("crumbs", true, null);
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
  }
});
