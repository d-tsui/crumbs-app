'use strict';

var React = require('react-native');
var {
  Image,
  MapView,
  PropTypes,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Component
} = React;

var styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  }
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null
    };
  }

  componentWillReceiveProps(){
    navigator.geolocation.getCurrentPosition(
      location => {
        this.setState({ lat: location.coords.latitude, lng: location.coords.longitude });
      },
      error => {
        this.setState({
          message: 'There was a problem with obtaining your locaton: ' + error
        });
      });
  }

  render() {
      return (
        <View style={styles.container}>
          <Text>
            {this.state.lat}, {this.state.lng}
          </Text>
        </View>
      );
    }
}

module.exports = Map;
