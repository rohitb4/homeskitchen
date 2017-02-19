import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
const mark = require('../../Images/login/login1_mark.png');

export default class Success extends Component {

  render() {
    return (
      <View style={styles.successStyle}> 
        <View style={styles.markWrap}>
            <Image source={mark} style={styles.mark} resizeMode="contain" />
            
        </View>
        <Text style={styles.successText}> {this.props.message}</Text>
         <TouchableOpacity
              onPress={() => {
                this.props.nav.push({
                  index: 'Login'
                });
              }}
            >
              <View>
                <Text style={styles.successText}>Click here to Login now!</Text>
              </View>
            </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  successStyle: {
    backgroundColor: 'green',
    flex: 1
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  markWrap: {
    flex: 0.7,
    paddingVertical: 30,
  },
  successText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20
  }
});
