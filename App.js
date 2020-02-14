import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import MainStack from './src/stacks/MainStack';
import NavigationService from './src/config/navigationService';
import {Root} from 'native-base';

export default function App() {
  return (
    <Root>
      <View style={{flex: 1}}>
        <MainStack
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </View>
    </Root>
  );
}
