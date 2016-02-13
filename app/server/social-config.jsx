Meteor.startup(function(){
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
