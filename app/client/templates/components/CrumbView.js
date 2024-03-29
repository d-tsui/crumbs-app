Template.CrumbView.events({
  "click #crumbsBackButton": function(){
    Session.set("viewType", "feed");
  },
  "click #cardItem": function(){
    Session.set("toggleDelete", 1 - Session.get("toggleDelete"));
  },
  "click #deleteButton": function(){
    IonPopup.confirm({
      title: 'Delete Post',
      template: 'Are you sure you want to delete your crumb?  This action cannot be undone.',
      onOk: function() {
        Meteor.call("deleteCrumb", Session.get("currentCrumb"));
        Session.set("viewType","feed");
      },
      onCancel: function() { }
    });
  },
  "click #flagButton": function(){
    IonPopup.confirm({
      title: 'Flag Post',
      template: 'Are you sure you want to flag this post?',
      onOk: function() {
        Meteor.call("flagCrumb", Session.get("currentCrumb"));
        Session.set("viewType","feed");
      },
      onCancel: function() { }
    });
  },
  "click #replySubmit": function(){
    var comment = {};
    comment.type = "text";
    comment.content = document.getElementById("replyText").value;
    comment.crumbId = Session.get("currentCrumb");
    if (comment.content){
      Meteor.call("postComment", comment);
      document.getElementById("replyText").value = "";
    }
  },
  "click #addToPoll": function(){
    var answer = document.getElementById("pollAnswer").value;
    if (answer){
        Meteor.call("addToPoll", Session.get("currentCrumb"), answer);
        document.getElementById("pollAnswer").value = "";
    }
  },
  "click #voteItem": function(){
    var c = closest(event.target, function(el){return el.id === 'voteItem';});
    var answer = c.getAttribute("data-id");
    if (answer){
        Meteor.call("addToPoll", Session.get("currentCrumb"), answer);
        document.getElementById("pollAnswer").value = "";
    }
  }
});

Template.CrumbView.rendered = function(){
  Session.set("toggleDelete", 0);
  Meteor.subscribe("crumbs", true, null);
}

Template.CrumbView.helpers({
  currentCrumb: function(){
    if (Session.get("currentCrumb")){
      var crumb = Crumbs.findOne({_id: Session.get("currentCrumb")});
      crumb.timestamp = moment(crumb.time).fromNow(true);
      crumb.text = (crumb.type == "text");
      crumb.image = (crumb.type == "image");
      crumb.gif = (crumb.type == "gif");
      crumb.poll = (crumb.type == "poll");
      return crumb;
    } else {
      return null;
    }
  },
  currentComments: function(){
    if (Session.get("currentCrumb")){
      var comments = Comments.find({crumbId: Session.get("currentCrumb")},{sort: {time: -1}}).fetch();
      _.map(comments, function(comment){
        comment.timestamp = moment(comment.time).fromNow(true);
      });
      return comments;
    } else {
      return null;
    }
  },
  noCurrentComments: function(){
    if (Session.get("currentCrumb")){
      return Comments.find({crumbId: Session.get("currentCrumb")}).count() == 0;
    } else {
      return 0;
    }
  },
  myCrumb: function(){
    if(Crumbs.findOne({_id: Session.get("currentCrumb"), userId: Meteor.userId()})){
      return true;
    } else {
      return false;
    }
  },
  toggleDelete: function(){
    return Session.get("toggleDelete");
  },
  pollAnswers: function(){
    var crumb = Crumbs.findOne({_id: Session.get("currentCrumb")});
    if (crumb.type == "poll"){
      var poll = crumb.poll;
      for (x in poll){
        poll[x].count = poll[x].votes.length;
        poll[x].me = _.contains(poll[x].votes, Meteor.userId());
      }

      var poll = _.sortBy(poll, function(p){ return p.count * -1; });
      return poll;
    } else {
      return null;
    }
  }
});

function closest(el, fn) {
    return el && (
        fn(el) ? el : closest(el.parentNode, fn)
    );
}
