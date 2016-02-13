/* Social Configurations File */
Meteor.startup(function(){
  /* Update the Facebook configuration settings */
  ServiceConfiguration.configurations.upsert(
    { service: "facebook" },
    {
      $set: {
        appId: Meteor.settings.public.facebook.appId,
        secret: Meteor.settings.facebook.secret
      }
    }
  );
})
