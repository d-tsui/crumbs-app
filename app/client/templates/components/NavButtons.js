Template.CrumbsButton.events({
  "click .crumbsButton": function(){
    //Router.go("Feed");
    Session.set("viewType", "feed");
  }
});
