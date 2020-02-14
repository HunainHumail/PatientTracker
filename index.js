/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import SplashScreen from './src/containers/SplashScreen/index';
import App from './App'
import {name as appName} from './app.json';
// import Splash from './src/containers/SplashScreen/index';

AppRegistry.registerComponent(appName, () => App);
