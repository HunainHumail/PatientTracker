import React, {Component} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import bgimage from '../images/drawerbackground.jpg';
import firebase from 'react-native-firebase';


export default class SideBar extends Component {
  

  render() {
    const name = firebase.auth();
    let emailfromfb = name.currentUser.email;
    {
      console.log('DRAWER USER', name.currentUser.email);
    }
    return (
      
      <View style={styles.drawer}>
        <ImageBackground source={bgimage} style={styles.headerImage}>
          <View style={styles.headerView}>
            <View
              style={{
                backgroundColor: 'white',
                ...styles.circleAvatar,
              }}>
              <Text style={styles.circleAvatarFont}>
                {emailfromfb[0].toUpperCase()}
              </Text>
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={styles.welcomeText}>WELCOME</Text>
              <Text>{emailfromfb}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={{flex: 5}}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  welcomeText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  circleAvatar: {
    width: 60,
    height: 60,
    borderRadius: 150 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleAvatarFont: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '25%',
    marginLeft: 10,
  },
  headerImage: {
    flex: 1.5,
    backgroundColor: 'blue',
    width: '100%',
  },
});
