Template.AppBody.rendered = function(){

}

Template.AppBody.helpers({
  home: function(){
    return Router.current().route.getName() == "Home";
  }
});
