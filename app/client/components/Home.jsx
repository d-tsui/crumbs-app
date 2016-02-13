Home = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      geolocation: Geolocation.latLng()
    }
  },
  render() {
    return (
      <div style={{width:'100%',height:'100%'}}>
        {this.data.geolocation ?
          <Map />:
          <div>Loading map...
          </div>
        }
      </div>
    )
  }
});
