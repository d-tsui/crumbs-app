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
  }

})
