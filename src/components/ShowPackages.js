import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

export default class ShowPackages extends Component {
  componentWillMount() {
    console.log(this.props.sessionID);
  }

  renderText() {
    return (
      <Text>User is logged in with the Session ID: {this.props.sessionID}</Text>
    );
  }

  render() {
    return (
      <View>
        {this.renderText()}
      </View>
    );
  }
}
