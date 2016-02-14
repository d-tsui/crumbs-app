Template.NavButtons.helpers({
  "menuToggle": function(){
    return Session.get("menuToggle");
  }
});

Template.NavButtons.rendered = function(){
  Session.set("menuToggle", false);
}

Template.CrumbsButton.events({
  "click .crumbsButton": function(){
    //Router.go("Feed");
    Session.set("viewType", "feed");
  }
});

Template.MenuButton.events({
  "click .menuButton": function(){
    if (Session.get("menuToggle")){
      document.getElementById("helpButton").className = "helpButton menuSlideUp";
      document.getElementById("helpButton").style.top = "15px";
      document.getElementById("logoutButton").className = "helpButton menuSlideUp2";
      document.getElementById("logoutButton").style.top = "15px";
      setTimeout(function(){
        Session.set("menuToggle", !Session.get("menuToggle"));
      }, 1000);
    } else {
      Session.set("menuToggle", !Session.get("menuToggle"));
    }



  }
});

Template.LogoutButton.events({
  "click .logoutButton": function(){
    Meteor.logout();
  }
});
