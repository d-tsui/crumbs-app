if (Meteor.isClient) {
  Template.body.events({
    "keyup #gif_search": function(){
      console.log(document.getElementById("gif_search").value);
      q = document.getElementById("gif_search").value;
      HTTP.call("GET", "http://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=dc6zaTOxFJmzC", function(err, res){
        console.log(res.data.data);
        Session.set("gifData",res.data.data);
      });

    }
  });

  Template.body.helpers({
    gifData: function(){
      return Session.get("gifData");
    }
  });

}

if (Meteor.isServer) {

}
