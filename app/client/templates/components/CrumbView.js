Template.CrumbView.events({
  "click #crumbsBackButton": function(){
    Session.set("viewType", "feed");
  }
});

Template.CrumbView.helpers({
  currentCrumb: function(){
    if (Session.get("currentCrumb")){
      var crumb = Crumbs.findOne({_id: Session.get("currentCrumb")});
      crumb.timestamp = moment(crumb.time).fromNow(true);
      return crumb;
    } else {
      return null;
    }
  },
  currentComments: function(){
    if (Session.get("currentCrumb")){
      var comments = Comments.find({crumbId: Session.get("currentCrumb")}).fetch();
      _.map(comments, function(comment){
        comment.timestamp = moment(comment.time).fromNow(true);
      });
      return comments;
    } else {
      return null;
    }
  },
  noCurrentComments: function(){
    if (Session.get("currentCrumb")){
      return Comments.find({crumbId: Session.get("currentCrumb")}).count() == 0;
    } else {
      return 0;
    }
  }
});
