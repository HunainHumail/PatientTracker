import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import InitialStack from './initialStack';
import HomeStack from './HomeStack';

const MainStack = createStackNavigator({
  ...InitialStack,
  ...HomeStack,
});

export default createAppContainer(MainStack);
