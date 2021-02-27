import React from 'react';
import StackScreen from './src/route/stack/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/Store/store';

import {LogBox} from 'react-native';
LogBox.ignoreAllLogs(true);
console.disableYellowBox = ['Unable to symbolicate'];
console.disableYellowBox = true;

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackScreen />
      </NavigationContainer>
    </Provider>
  );
}
