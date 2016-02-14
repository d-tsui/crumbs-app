
Template.Login.events({
  "click #login-with-facebook": function(event){
    Meteor.loginWithFacebook({loginStyle:"redirect",requestPermissions: ['user_friends', 'public_profile', 'email']},function(){
      var user = Meteor.user();
      if (user.hasOwnProperty('services') && user.services.hasOwnProperty('facebook')  ) {
        var result = Meteor.http.get('https://graph.facebook.com/v2.5/' + user.services.facebook.id + '?access_token=' + user.services.facebook.accessToken + '&fields=first_name, last_name, birthday, email, gender, location, link, friends');
      }
      Router.go('Home');
    });
  }
});

Template.Login.destroyed = function () {
}
