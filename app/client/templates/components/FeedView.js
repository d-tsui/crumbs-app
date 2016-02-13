Template.FeedView.helpers({
  crumbs : function(){
    var crumbs = Crumbs.find().fetch();
    _.map(crumbs, function(crumb){
      crumb.timestamp = moment(crumb.time).fromNow(true);
    });
    return crumbs;
  }
});
