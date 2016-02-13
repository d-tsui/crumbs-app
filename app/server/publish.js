Meteor.publish("crumbs", function () {
  if (this.userId) {
    return Crumbs.find({});
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
