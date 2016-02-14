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
  }
});
