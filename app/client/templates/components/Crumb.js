Template.Crumb.helpers({
  crumb: function(){
    var crumb = Crumbs.findOne({_id: Router.current().params._id});
    crumb.timestamp = moment(crumb.time).fromNow(true);
    return crumb;
  },
  comments: function(){
    var comments = Comments.find({crumbId: Router.current().params._id}).fetch();
    _.map(comments, function(comment){
      comment.timestamp = moment(comment.time).fromNow(true);
    });
    return comments;
  },
  noComments: function(){
    return Comments.find({crumbId: Router.current().params._id}).count() == 0;
  }
});

Template.Crumb.events({
  "click #replySubmit": function(){
    var comment = {};
    comment.type = "text";
    comment.content = document.getElementById("replyText").value;
    comment.crumbId = Router.current().params._id;
    if (comment.content){
      Meteor.call("postComment", comment);
      document.getElementById("replyText").value = "";
    }
  }
});
