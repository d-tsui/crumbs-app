Login = React.createClass({
  mixins: [ReactMeteorData, ReactRouter.History],
  getMeteorData() {
    return {
      user: Meteor.user(),
      userLoading: Meteor.loggingIn()
    }
  },
  componentWillMount: function() {
    if (this.getLoginStatus()) {
      this.history.pushState(null, '/');
    }
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (this.getLoginStatus()) {
      this.history.pushState(null, '/');
    }
  },
  getLoginStatus() {
    if (this.data.userLoading || !this.data.user) {return false;}
    if (this.data.user) {return true;}
    return false
  },
  login(){
    Meteor.loginWithFacebook()
  },
  render() {
    return (
      <div className="ionic-body">
        <div className="view">
          <div className="content padding">
            <h1>Login Page</h1>
            <button className="button button-full button-positive" onClick={this.login}>Login With Facebook</button>
          </div>
        </div>
      </div>
    )
  }
});
