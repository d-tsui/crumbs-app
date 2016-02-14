// myCrumbs is a boolean
// if myCrumbs, publish user's own crumbs
// else publish nearby feed
Meteor.publish("crumbs", function (myCrumbs, myLocation) {
  if (this.userId) {
    var crumbFilter = {
      'flag.2': { $exists: false },
      'flag': { $nin: [this.userId] },
      'hidden': { $exists: false }
    };

    if (myCrumbs){            //returns all crumbs user has posted
      return Crumbs.find(
        {userId: this.userId, 'hidden': { $exists: false }},
        {sort: {time: -1}}
      );
    } else {
      return Crumbs.find(   //returns all crumbs within radius
        {$and:[
          {geo:{ $near :{$geometry: { type: "Point",  coordinates: myLocation }, $maxDistance:50} }},
          crumbFilter
        ]},
        {sort: {time: -1}}
      );
    }
  } else {
    this.ready();
  }
});


Meteor.publish("comments", function () {
  if (this.userId) {
    return Comments.find({},{sort: {time: -1}});
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
