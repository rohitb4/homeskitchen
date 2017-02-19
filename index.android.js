import React, { Component } from 'react';
import { AppRegistry, Navigator, StyleSheet, View } from 'react-native';

import CreateUser from './src/components/CreateUser';
import Login from './src/components/Login';
import ShowPackages from './src/components/ShowPackages';
import Success from './src/components/Success';

var styles = StyleSheet.create({
  mainStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1
  }
});

class HomesKitchen extends Component {
  onPress() {

  }

  renderScene(navigator, route) {
    switch(route.index) {
      case 'Login': return <Login title={route.title} nav={navigator} {...route.passProps} />;
      case 'CreateUser': return <CreateUser nav={navigator} {...route.passProps} />;
      case 'ShowPackages': return <ShowPackages nav={navigator} {...route.passProps} />;
      case 'Success': return <Success nav={navigator} {...route.passProps} />;
    }
  }

  render() {
    var comp = this;
    return (
      <Navigator
        initialRoute={{ title: 'My Initial Scene', index: 'Login' }}
        renderScene={(route, navigator) => {
            return (
              <View style={styles.mainStyle}>
                {(() => {
                  return comp.renderScene(navigator, route);
                })()}
              </View>
            );
          }
        }
      />
    );
  }
}

AppRegistry.registerComponent('HomesKitchen', () => HomesKitchen);
