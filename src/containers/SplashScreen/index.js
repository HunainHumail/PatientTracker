import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import bgimage from '../../images/background.png';

var {height, width} = Dimensions.get('window');
export default class Splash extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    logoOpacity: new Animated.Value(0),
  };

  componentDidMount() {
    //add animation
    Animated.sequence([
      //Animations by seq
      Animated.timing(this.state.logoOpacity, {
        toValue: 1,
        duration: 3000, //3sec
      }),
    ]).start(() => {
      this.props.navigation.navigate('LoadingScreen');
    });
  }
  render() {
    return (
      <ImageBackground style={styles.containerbg} source={bgimage}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: '100%',
            width: '100%',
          }}>
          <View style={styles.container}>
            <Animated.Image
              source={require('../../images/splashlogo.png')}
              style={{
                ...styles.logo,
                opacity: this.state.logoOpacity,
              }}></Animated.Image>
          </View>
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
  container: {
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
