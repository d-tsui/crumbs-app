// myCrumbs is a boolean
// if myCrumbs, publish user's own crumbs
// else publish nearby feed
Meteor.publish("crumbs", function (myCrumbs, myLocation) {
  if (this.userId) {
    if (myCrumbs){
      return Crumbs.find({userId: this.userId});
    } else {
      return Crumbs.find({geo:{ $near :{$geometry: { type: "Point",  coordinates: myLocation },$minDistance: 0,$maxDistance:3000} } });
    }
  } else {
    this.ready();
  }
});


Meteor.publish("comments", function () {
  if (this.userId) {
    return Comments.find({});
  } else {
    this.ready();
  }
});


Meteor.publish("notifications", function () {
  if (this.userId) {
    return Notifications.find({});
  } else {
    this.ready();
  }
});
