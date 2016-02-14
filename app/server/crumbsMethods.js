Meteor.methods({
  postCrumb : function(crumb){
    crumb.time = new Date();
    crumb.userId = Meteor.userId();
    crumb.flag = [];
    Crumbs.insert(crumb);
  },
  flagCrumb : function(crumbId){
    var userId = Meteor.userId();
    if (Crumbs.find({'_id':crumbId, 'flag':{'$in':[userId]}}).count() == 0){
      Crumbs.update({'_id':crumbId}, {'$push':{'flag':userId}});
    }
  },
  deleteCrumb : function(crumbId){
    var userId = Meteor.userId();
    if (Crumbs.findOne({'_id':crumbId})["userId"] == userId){
      Crumbs.update({'_id':crumbId}, {'$set':{'hidden':1}});
    }
  },
  addToPoll: function(crumbId, answer){
    var low = answer.toLowerCase();
    var crumb = Crumbs.findOne({'_id':crumbId});
    var poll = crumb.poll;
    var alreadyInPoll = false;
    for (x in poll){
      var i = _.indexOf(poll[x].votes, Meteor.userId());
      if (i != -1){
        poll[x].votes.splice(i, 1);
      }
      if (poll[x].answer.toLowerCase() == low){
        alreadyInPoll = true;
        poll[x].votes.push(Meteor.userId());
      }
    }
    if (!alreadyInPoll){
      var newAnswer = {};
      newAnswer.answer = answer;
      newAnswer.votes = [Meteor.userId()];
      poll.push(newAnswer);
    }
    Crumbs.update({'_id':crumbId}, {'$set':{'poll':poll}});
  }

});
