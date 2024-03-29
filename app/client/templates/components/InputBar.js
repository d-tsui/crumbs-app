var dataURLToBlob = function(dataURL){
  var arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
};

Template.InputBar.helpers({
});

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
    if (crumb.type == "text" || crumb.type == "poll"){
      crumb.content = document.getElementById("inputContent").value;
      if (crumb.type == "poll"){
        crumb.poll = [];
      }
    } else if (crumb.type == "image" || crumb.type == "gif"){
      crumb.src =  document.getElementById("imagePreview").src;
      crumb.content = document.getElementById("inputContent").value;
    }

    if ((crumb.content != "" || crumb.src) && geo){
      crumb.geo = [geo.lng, geo.lat];
      Meteor.call("postCrumb", crumb);
      Session.set("crumbType", "text");
      Session.set("selectedGif",null);
      //document.getElementById("input-bar-card").style.opacity = "0.5";
      document.getElementById("input-bar-card").innerHTML = "<span id='input-bar-button-span'></span><label class='item item-input' id='input-bar-label'><input type='text' placeholder='Write something...' id='inputContent'><button class='button button-clear' id='submit'><i class='icon ion-ios-arrow-right placeholder-icon'></i></button></label>";
    }
  },
  "focusin #inputContent": function(){
    document.getElementById("input-bar-card").removeAttribute("style");
    document.getElementById("input-bar-card").className += ' focusInputBar';
  },
  "focusout #inputContent": function(){
    if (!document.getElementById("imagePreview") && !Session.get("selectedGif") && Session.get("crumbType") != "poll"){
      document.getElementById("input-bar-card").className = 'card input-bar focusOutInputBar';
      document.getElementById("input-bar-card").style.opacity = 0.6;
    }
  },
  "keyup #inputContent": function(){
    var input = document.getElementById("inputContent").value.toLowerCase();
    if ((input == "image" || input == "pic" || input == "photo") && Session.get("crumbType") == "text"){
      document.getElementById("input-bar-button-span").innerHTML = "<span class='icon ion-image input-bar-button' id='input-bar-button-image'></span>";
    } else if (input == "cam" && Session.get("crumbType") == "text") {
      document.getElementById("input-bar-button-span").innerHTML = "<span class='icon ion-camera input-bar-button' id='input-bar-button-camera'></span>";
    } else if (input == "gif" && Session.get("crumbType") == "text") {
      document.getElementById("input-bar-button-span").innerHTML = "<span class='input-bar-button' id='input-bar-button-gif'>GIF</span>";
    } else if ((input == "ask" || input == "poll" && Session.get("crumbType") == "text") || Session.get("crumbType") == "poll") {
      if (Session.get("crumbType") == "poll"){
        document.getElementById("input-bar-button-span").innerHTML = "<span class='input-bar-button' id='input-bar-button-poll' style='background-color:rgba(17,193,243,0.4);'>ASK</span>";
      } else {
        document.getElementById("input-bar-button-span").innerHTML = "<span class='input-bar-button' id='input-bar-button-poll'>ASK</span>";
      }
    } else {
      document.getElementById("input-bar-button-span").innerHTML = "";
    }

    if (document.getElementsByClassName("input-bar-button")[0]){
      document.getElementsByClassName("input-bar-button")[0].className += " pullUp";
    }
  },
  "click #input-bar-button-image": function(event){
    event.preventDefault();
    var options = {};
    if (Meteor.isCordova){
      options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
    }
    MeteorCamera.getPicture(options, function(err, data){
      Cloudinary._upload_file(dataURLToBlob(data), {
        folder: "crumbs"
      }, function(err, res) {
        var url = res.url;
        Session.set("crumbType", "image");
        document.getElementById("input-bar-card").style.opacity = 1;
        document.getElementById("input-bar-card").innerHTML = "<i class='icon ion-close' style='top: 7px;right: 7px;position: absolute;'></i><img src='"+ url + "' id='imagePreview' class='img-responsive' style='width:100%;padding:25px' />" + document.getElementById("input-bar-card").innerHTML;
      });
    });
  },
  "click #input-bar-button-camera": function(event){
    event.preventDefault();
    var options = {};
    MeteorCamera.getPicture(options, function(err, data){
      Cloudinary._upload_file(dataURLToBlob(data), {
        folder: "crumbs"
      }, function(err, res) {
        var url = res.url;
        Session.set("crumbType", "image");
        document.getElementById("input-bar-card").style.opacity = 1;
        document.getElementById("input-bar-card").innerHTML = "<i class='icon ion-close' style='top: 7px;right: 7px;position: absolute;'></i><img src='"+ url + "' id='imagePreview' class='img-responsive' style='width:100%;padding:25px' />" + document.getElementById("input-bar-card").innerHTML;
      });
    });
  },
  "click .ion-close": function(event){
    event.preventDefault();
    Session.set("crumbType", "text");
    Session.set("selectedGif",null);
    document.getElementById("input-bar-card").innerHTML = "<i class='icon ion-close' style='top: 7px;right: 7px;position: absolute;'></i><label class='item item-input' id='input-bar-label'><input type='text' placeholder='Write something...' id='inputContent'><span id='input-bar-button-span'></span><button class='button button-clear' id='submit'><i class='icon ion-ios-arrow-right placeholder-icon'></i></button></label>";
  },
  "click #input-bar-button-gif": function(event){
    event.preventDefault();
    Session.set("viewType", "gif");
  },
  "click #input-bar-button-poll": function(event){
    event.preventDefault();
    if (Session.get("crumbType") == "text"){
      Session.set("crumbType", "poll");
      document.getElementById("inputContent").value = "";
      document.getElementById("input-bar-button-poll").style.backgroundColor = "rgba(17,193,243,1)";
    } else {
      Session.set("crumbType", "text");
      document.getElementById("input-bar-button-poll").style.backgroundColor = "rgba(17,193,243,0.4)";
    }
  }
});

Template.InputBar.rendered = function(){
  if (! Session.get("selectedGif")){
    Session.set("crumbType", "text");
  } else {
    Session.set("crumbType", "gif");
    document.getElementById("input-bar-card").style.opacity = 1;
    document.getElementById("input-bar-card").innerHTML = "<img src='"+ Session.get("selectedGif") + "' id='imagePreview' class='img-responsive' style='width:100%;padding:25px' />" + document.getElementById("input-bar-card").innerHTML;
  }
}
