Meteor.methods({
  postComments : function(comment){
    comment.time = new Date();
    comment.userId = Meteor.userId();
    comment.flag = [];
    Comments.insert(comment);
  },
  flagComments : function(commentId){
    var userId = Meteor.userId();
    if (Comments.find({'_id':commentId, 'flag':{'$in':[userId]}}).count() == 0){
      Comments.update({'_id':commentId}, {'$push':{'flag':userId}});
    }
  },
  deleteComments : function(commentId){
    var userId = Meteor.userId();
    if (Comments.findOne({'_id':commentId})["userId"] == userId){
      Comments.update({'_id':commentId}, {'$set':{'hidden':1}});
    }
  }

})
