import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import firebase from 'react-native-firebase';
import NavigationService from '../../config/navigationService';
import bgimage from '../../images/background.png';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width: WIDTH} = Dimensions.get('window');

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {email: '', password: '', errorMessage: null};

  handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email.trim(), this.state.password)
      .then(() => NavigationService.reset_0('Home'))
      .catch(error => this.setState({errorMessage: error.message}));
    console.log('handleLogin');
  };

  logoutButtonHandler = () => {
    if (this.state.email && this.state.password) {
      this.handleLogin();
    } else {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    }
  };

  render() {
    return (
      <ImageBackground style={styles.containerbg} source={bgimage}>
        <View style={styles.titlecontainer}>
          <Text style={{color: '#FFF', fontSize: 30, fontWeight: '500'}}>
            Login
          </Text>
          {this.state.errorMessage && (
            <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
          )}

          <View style={styles.inputContainer}>
            <Icon
              name={'person'}
              size={28}
              color={'rgba(255,255,255,0.7)'}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor="#b2bec3"
              onChangeText={email => this.setState({email})}
              value={this.state.email}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon
              name={'lock'}
              size={28}
              color={'rgba(255,255,255,0.7)'}
              style={styles.inputIcon}
            />
            <TextInput
              secureTextEntry
              style={styles.input}
              autoCapitalize="none"
              placeholder="Password"
              placeholderTextColor="#b2bec3"
              onChangeText={password => this.setState({password})}
              value={this.state.password}
            />
          </View>
          <TouchableOpacity
            onPress={this.logoutButtonHandler}
            style={styles.buttonLogin}>
            <Text style={{textAlign: 'center', color: '#FFF'}}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={{padding: 20, color: '#FFF'}}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  containerbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titlecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
  },

  inputContainer: {
    marginTop: 15,
  },

  inputIcon: {
    position: 'absolute',
    top: 7,
    left: 37,
  },

  buttonLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    marginTop: 20,
    backgroundColor: 'rgba(10, 61, 98,0.6)',
    justifyContent: 'center',
  },
});
