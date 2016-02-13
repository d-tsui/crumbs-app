Template.InputBar.events({
  "click #submit": function(){
    var crumb = {}
    crumb.type = "text";
    crumb.content = document.getElementById("inputContent").value;
    var geo = Geolocation.latLng();
    if (crumb.content != "" && geo){
      crumb.geo = [geo.lng, geo.lat];
      Meteor.call("postCrumb", crumb);
      document.getElementById("inputContent").value = "";
    } else if (!geo){
      IonPopup.alert({
        title: 'Woah there.',
        template: 'Your geolocation is disabled!',
        okText: 'OK'
      });
    }

  }
});
