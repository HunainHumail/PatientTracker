import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import firebase from 'react-native-firebase';
import bgimage from '../../images/background.png';

const {width: WIDTH} = Dimensions.get('window');

export default class SignUp extends React.Component {
  state = {email: '', password: '', errorMessage: null};

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.email.trim(),
        this.state.password,
      )
      .then(snapshot => {
        console.log('snapshjot', snapshot);
        let userObj = {
          email: snapshot.user.email,
          userId: snapshot.user.uid,
        };
        firebase
          .database()
          .ref(`/user/${snapshot.user.uid}/`)
          .set(userObj);
      })
      .catch(error => this.setState({errorMessage: error.message}));

    console.log('handleSignUp');
  };

  signUpButtonHandler = () => {
    if (this.state.email && this.state.password) {
      this.handleSignUp();
    } else {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'SignUp');
    });
  }

  render() {
    return (
      <ImageBackground style={styles.containerbg} source={bgimage}>
        <View style={styles.container}>
          <Text style={{color: '#FFF', fontSize: 30, fontWeight: '500'}}>
            Sign Up
          </Text>
          {this.state.errorMessage && (
            <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#b2bec3"
              autoCapitalize="none"
              style={styles.input}
              onChangeText={email => this.setState({email})}
              value={this.state.email}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#b2bec3"
              autoCapitalize="none"
              style={styles.input}
              onChangeText={password => this.setState({password})}
              value={this.state.password}
            />
          </View>

          <TouchableOpacity
            onPress={this.signUpButtonHandler}
            style={styles.buttonSignUp}>
            <Text style={{textAlign: 'center', color: '#FFF'}}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('LoginScreen');
            }}>
            <View style={{marginTop: 40}}>
              <Text style={{color: '#fff'}}>
                Already have an Account? Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
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
  containerbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
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
  buttonSignUp: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    marginTop: 20,
    backgroundColor: 'rgba(10, 61, 98,0.6)',
    justifyContent: 'center',
  },
});
