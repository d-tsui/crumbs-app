Template.Home.events({
  "click #crumbsBackButton": function(){
    Session.set("feedView", 0);
  }
});

Template.Home.helpers({
  feedView: function(){
    return Session.get("feedView") == 1;
  },
  crumbs : function(){
    var crumbs = Crumbs.find().fetch();
    _.map(crumbs, function(crumb){
      crumb.timestamp = moment(crumb.time).fromNow(true);
    });
    return crumbs;
  }
});

Template.Home.rendered = function(){
  Session.set("feedView", 0);
};
