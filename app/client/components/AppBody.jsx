AppBody = React.createClass({
  mixins: [ReactMeteorData, ReactRouter.History],
  getMeteorData: function() {
    return {
      isAuthenticated: Meteor.userId() !== null,
      geolocation: Geolocation.latLng()
    }
  },
  componentWillMount: function() {
    // Check that the user is logged in before the component mounts
    if (!this.data.isAuthenticated) {
      this.history.pushState(null, '/login');
    }
  },
  componentDidUpdate: function(prevProps, prevState) {
    // Navigate to a sign in page if the user isn't authenticated when data changes
    if (!this.data.isAuthenticated) {
      this.history.pushState(null, '/login');
    }
  },
  getInitialState: function() {
    return {};
  },
  render() {
    return (
      <div className="ionic-body">
        <div className="view">
          <div className="scroll-content ionic-scroll">
            <div className="content overflow-scroll">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
});
