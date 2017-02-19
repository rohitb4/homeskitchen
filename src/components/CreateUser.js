import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Spinner } from './common';

const background = require('../../Images/signup/signup_bg.png');
const backIcon = require('../../Images/signup/back.png');
const personIcon = require('../../Images/signup/signup_person.png');
const lockIcon = require('../../Images/signup/signup_lock.png');
const emailIcon = require('../../Images/signup/signup_email.png');
const birthdayIcon = require('../../Images/signup/signup_birthday.png');

export default class CreateUser extends Component {

  state = { email: '', password: '', error: '', loading: false, name: '', dob: '', address: '' };

  onPress() {
    const { email, password, name, address, dob } = this.state;
    this.setState({ error: '', loading: true });

    if (email !== '' && password !== '' && name !== '' && address !== '' && dob !== '') {
      var details = {
          'username': email,
          'password': password,
          'address': address,
          'dob': dob,
          'email': email,
          'firstname': name,
          'lastname': name
      };

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch('http://35.154.68.252:8080/homesKitchen/webapi/users/createuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formBody
        })
        .then((response) => this.onLoginSuccess(response, this))
        .catch((error) => this.onLoginFail(error, this));
      } else {
        this.setState({ error: 'User Fields Empty', loading: false, email: '', password: '', name: '', address: '', dob: '' });
      }
  }

  onLoginSuccess(response, state) {
    if (response.status === 200) {
      state.setState({ error: 'User Created Sucessfully', loading: false, email: '', password: '', name: '', address: '', dob: '' });
    } else {
      state.setState({ error: 'User Creation Failed', loading: false, email: '', password: '', name: '', address: '', dob: '' });
    }
  }

  onLoginFail(error, state) {
    state.setState({ error: 'Authentication Failed', loading: false });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner sizeOfSpinner="small" />;
    }

    return (
      <Text style={styles.whiteFont} onPress={this.onPress.bind(this)}>
        Join
      </Text>
    );
  }

  render() {
    var comp = this;
    return (
      <View style={styles.container}>
        <Image
          source={background}
          style={[styles.container, styles.bg]}
          resizeMode="cover"
        >
          <View style={styles.headerContainer}>

            <View style={styles.headerIconView}>
              <TouchableOpacity
                style={styles.headerBackButtonView}
                onPress={() => {
                    comp.props.nav.push({
                      index: 'Login'
                    });
                  }}
              >
                <Image
                  source={backIcon}
                  style={styles.backButtonIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.headerTitleView}>
              <Text style={styles.titleViewText}>Sign Up</Text>
            </View>

          </View>

          <View style={styles.inputsContainer}>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={personIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Name"
                placeholderTextColor="#FFF"
                underlineColorAndroid='transparent'
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={emailIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Email"
                placeholderTextColor="#FFF"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={lockIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                secureTextEntry
                style={[styles.input, styles.whiteFont]}
                placeholder="Password"
                placeholderTextColor="#FFF"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={birthdayIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Birthday"
                placeholderTextColor="#FFF"
                underlineColorAndroid='transparent'
                value={this.state.dob}
                onChangeText={dob => this.setState({ dob })}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={personIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Address"
                placeholderTextColor="#FFF"
                underlineColorAndroid='transparent'
                value={this.state.address}
                onChangeText={address => this.setState({ address })}
              />
            </View>

          </View>

          <View style={styles.footerContainer}>

            <TouchableOpacity>
              <View style={styles.signup}>
                {this.renderButton()}
              </View>
            </TouchableOpacity>

            <View>
              <Text>
                {this.state.error}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                comp.props.nav.push({
                  index: 'Login'
                });
              }}
            >
              <View style={styles.signin}>
                <Text style={styles.greyFont}>Already have an account?<Text style={styles.whiteFont}> Sign In</Text></Text>
              </View>
            </TouchableOpacity>
          </View>
        </Image>
      </View>
      /*<View>
        <TextInput placeholder="Username"></TextInput>
        <TextInput placeholder="Email"></TextInput>
        <TextInput placeholder="Password"></TextInput>
        <TextInput placeholder="Re-enter Password"></TextInput>
        <Button onPress={this.onPress} title="Register" color="#841584" accessibilityLabel="Learn more about this purple button" />
        <TouchableHighlight onPress={() => {
            comp.props.nav.push({
              index: 'Login'
            });
          }}>
          <Text style={styles.registerText}>Back</Text>
        </TouchableHighlight>
      </View>*/
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    paddingTop: 20,
    width: null,
    height: null
  },
  headerContainer: {
    flex: 1,
  },
  inputsContainer: {
    flex: 3,
    marginTop: 10,
  },
  footerContainer: {
    flex: 1
  },
  headerIconView: {
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  headerBackButtonView: {
    width: 20,
    height: 20,
  },
  backButtonIcon: {
    width: 20,
    height: 20
  },
  headerTitleView: {
    backgroundColor: 'transparent',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleViewText: {
    fontSize: 25,
    color: '#fff',
  },
  inputs: {
    paddingVertical: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
    flexDirection: 'row',
    height: 60,
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: 25,
    height: 25,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  signup: {
    backgroundColor: '#FF3366',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF'
  }
});
