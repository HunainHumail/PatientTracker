import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions,TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import NavigationService from '../config/navigationService';
const {width: WIDTH} = Dimensions.get('window');

export default class BackHeader extends Component {
  render() {
    return (
      <View style={styles.header}>
        <LinearGradient
          colors={['#3867B4', '#0F94B4']}
          style={styles.headerGradient}>
          <TouchableOpacity style={styles.icon} onPress = {() => {NavigationService.reset_0('Home')}}>
            <Icons name="arrow-left" size={25} color="#FFF" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {

    width: WIDTH,
    height: 100,
  },
  headerGradient: {
    width: WIDTH,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
  },
  icon: {
    width: '5%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
