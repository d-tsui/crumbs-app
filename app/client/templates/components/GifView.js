Template.GifView.helpers({
  gifData: function(){
    return Session.get("gifData");
  }
});

Template.GifView.events({
  "keyup #gifQuery": function(){
    q = document.getElementById("gifQuery").value;
    HTTP.call("GET", "http://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=dc6zaTOxFJmzC", function(err, res){
      Session.set("gifData",res.data.data);
    });
  },
  "click #crumbsBackButton": function(){
    Session.set("viewType", "map");
  },
  "click #selectThisGif": function(event){
    Session.set("selectedGif", event.target.src);
    Session.set("viewType", "map");
  }
});

Template.GifView.rendered = function(){
  Session.set("selectedGif", null);
}
