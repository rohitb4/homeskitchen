import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { Spinner } from './common';
import {lib} from './common/lib';

const { width, height } = Dimensions.get('window');

const background = require('../../Images/login/login1_bg.png');
const mark = require('../../Images/login/login1_mark.png');
const lockIcon = require('../../Images/login/login1_lock.png');
const personIcon = require('../../Images/login/login1_person.png');

export default class Login extends Component {

  state = { email: '', password: '', error: '', loading: false };

  onPress() {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });

    var details = {
        'username': email,
        'password': password
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(`${lib.serverUrl}homeskitchen/webapi/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody
      })
      .then((response) => this.onLoginSuccess(response, this))
      .catch((error) => this.onLoginFail(error, this));
  }

  onLoginSuccess(response, state) {
    if (response.status === 200) {
      state.setState({ error: 'Auth Successful', loading: false, email: '', password: '' });
      var cookieVal = response.headers.get('set-cookie');
      cookieVal = cookieVal.split(';')[0].split('=')[1];
      this.props.nav.push({
        index: 'ShowPackages',
        passProps: {
          sessionID: cookieVal
        }
      });
      try {
        await AsyncStorage.setItem('sessionKey', cookieVal);
      } 
    } else {
      state.setState({ error: 'Auth Failed', loading: false, email: '', password: '' });
    }
  }

  onLoginFail(error, state) {
    state.setState({ error: 'Authentication Failed', loading: false });
    console.log(error);
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner sizeOfSpinner="small" />;
    }

    return (
      <Text style={styles.buttonText} onPress={this.onPress.bind(this)}>
        Sign In
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} resizeMode="cover">
          <View style={styles.markWrap}>
            <Image source={mark} style={styles.mark} resizeMode="contain" />
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>

              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput
                placeholder="Username"
                placeholderTextColor="#FFF"
                style={styles.input}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                underlineColorAndroid='transparent'
              />
            </View>

            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput
                placeholderTextColor="#FFF"
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                underlineColorAndroid='transparent'
              />
            </View>

            <TouchableOpacity activeOpacity={0.5}>
              <View>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5}>
              <View style={styles.button}>
                {this.renderButton()}
              </View>
            </TouchableOpacity>

            <View>
              <Text>
                {this.state.error}
              </Text>
            </View>

          </View>

          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Dont have an account?</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.props.nav.push({
                    index: 'CreateUser'
                  });
                }}
              >
                <View>
                  <Text style={styles.signupLinkText}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    height: 20,
    width: 20
  },
  input: {
    flex: 1,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: '#FF3366',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  forgotPasswordText: {
    color: '#D8D8D8',
    backgroundColor: 'transparent',
    textAlign: 'right',
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountText: {
    color: '#D8D8D8'
  },
  signupLinkText: {
    color: '#FFF',
    marginLeft: 5,
  }
});
