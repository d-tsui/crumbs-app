Template.Crumb.helpers({
  crumb: function(){
    return Crumbs.findOne({_id: Router.current().params._id});
  },
  comments: function(){
    return Crumbs.find({crumbId})
  }
});
