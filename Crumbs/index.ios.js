'use strict';

var React = require('react-native');
var Map = require('./Map');

var styles = React.StyleSheet.create({
  container: {
    flex: 1
  }
});

class Crumbs extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Crumbs',
          component: Map,
        }}/>
    );
  }
}

React.AppRegistry.registerComponent('Crumbs', () => Crumbs);
