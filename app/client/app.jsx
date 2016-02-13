Meteor.startup( function(){
  Meteor.subscribe("places");
  Meteor.subscribe("users");
});
