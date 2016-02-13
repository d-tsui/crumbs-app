var dataURLToBlob = function(dataURL){
  var arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
};


Template.InputBar.events({
  "click #submit": function(){
    var crumb = {}
    var geo = Geolocation.latLng();
    if (!geo){
      IonPopup.alert({
        title: 'Woah there.',
        template: 'Your geolocation is disabled!',
        okText: 'OK'
      });
    }

    crumb.type = Session.get("crumbType");
    if (crumb.type == "text"){
      crumb.content = document.getElementById("inputContent").value;
    } else if (crumb.type == "image"){
      crumb.src =  document.getElementById("imagePreview").src;
      crumb.content = document.getElementById("inputContent").value;
    }

    if (crumb.content != "" && geo){
      crumb.geo = [geo.lng, geo.lat];
      Meteor.call("postCrumb", crumb);
      document.getElementById("input-bar-card").innerHTML = "<label class='item item-input' id='input-bar-label'><input type='text' placeholder='Write something...' id='inputContent'><span id='input-bar-button-span'></span><button class='button button-clear' id='submit'><i class='icon ion-ios-arrow-right placeholder-icon'></i></button></label>";
    }
  },
  "keyup #inputContent": function(){
    var input = document.getElementById("inputContent").value;
    if ((input == "image" || input == "pic" || input == "photo") && Session.get("crumbType") == "text"){
      document.getElementById("input-bar-button-span").innerHTML = "<i class='icon ion-image input-bar-button' id='input-bar-button-image'></i>";
    } else if (input == "cam" && Session.get("crumbType") == "text") {
      document.getElementById("input-bar-button-span").innerHTML = "<i class='icon ion-camera input-bar-button' id='input-bar-button-camera'></i>";
    } else {
      document.getElementById("input-bar-button-span").innerHTML = "";
    }
  },
  "click #input-bar-button-image": function(){
    event.preventDefault();
    var options = {width: 200,height: 200};
    if (Meteor.isCordova){
      options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
    }
    MeteorCamera.getPicture(options, function(err, data){
      Cloudinary._upload_file(dataURLToBlob(data), {
        folder: "crumbs"
      }, function(err, res) {
        var url = res.url;
        Session.set("crumbType", "image");
        document.getElementById("input-bar-card").innerHTML = "<img src='"+ url + "' id='imagePreview' class='img-responsive' />" + document.getElementById("input-bar-card").innerHTML;
      });
    });
  },
  "click #input-bar-button-camera": function(){
    event.preventDefault();
    var options = {width: 200,height: 200};
    MeteorCamera.getPicture(options, function(err, data){
      Cloudinary._upload_file(dataURLToBlob(data), {
        folder: "crumbs"
      }, function(err, res) {
        var url = res.url;
        Session.set("crumbType", "image");
        document.getElementById("input-bar-card").innerHTML = "<img src='"+ url + "' id='imagePreview' class='img-responsive' />" + document.getElementById("input-bar-card").innerHTML;
      });
    });
  }
});

Template.InputBar.rendered = function(){
  Session.set("crumbType", "text");
}
