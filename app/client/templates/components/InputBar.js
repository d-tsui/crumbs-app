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
      crumb.content = document.getElementById("imagePreview").src;
    }

    if (crumb.content != "" && geo){
      crumb.geo = [geo.lng, geo.lat];
      Meteor.call("postCrumb", crumb);
      document.getElementById("input-bar-label").innerHTML = "<input type='text' placeholder='Write something...' id='inputContent'><span id='input-bar-button-span'></span><button class='button button-clear' id='submit'><i class='icon ion-ios-arrow-right placeholder-icon'></i></button>";
    }
  },
  "keyup #inputContent": function(){
    var input = document.getElementById("inputContent").value;
    if (input == "image" || input == "pic"){
      document.getElementById("input-bar-button-span").innerHTML = "<i class='icon ion-image input-bar-button' id='input-bar-button-image'></i>";
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
        document.getElementById("input-bar-label").innerHTML = "<img src='"+ url + "' id='imagePreview' /><button class='button button-clear' id='submit'><i class='icon ion-ios-arrow-right placeholder-icon'></i></button>";
      });
    });
  }
});

Template.InputBar.rendered = function(){
  Session.set("crumbType", "text");
}
