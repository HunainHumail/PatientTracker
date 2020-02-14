
import HomeScreen from '../containers/HomeScreen/HomeScreen';
import PatientForm from '../containers/PatientForm/PatientForm';
import PatientDetails from '../containers/PatientDetails/PatientDetails';

const HomeStack = {
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  PatientForm: {
    screen: PatientForm,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  PatientDetails: {
    screen: PatientDetails,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
};

export default HomeStack;
