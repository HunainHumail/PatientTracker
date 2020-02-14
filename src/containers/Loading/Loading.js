import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import firebase from 'react-native-firebase';
import NavigationService from '../../config/navigationService';

export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        NavigationService.reset_0('Home');
      } else {
        NavigationService.reset_0('LoginScreen');
      }
      console.log('USER', user);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
