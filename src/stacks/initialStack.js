import LoginScreen from '../containers/LoginScreen/LoginScreen';
import SplashScreen from '../containers/SplashScreen/index';
import SignUp from '../containers/SignUpScreen/SignUpScreen';
import HomeScreen from '../containers/HomeScreen/HomeScreen';
import Loading from '../containers/Loading/Loading';

const InitialStack = {
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },

  LoadingScreen: {
    screen: Loading,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },

  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
};

export default InitialStack;
