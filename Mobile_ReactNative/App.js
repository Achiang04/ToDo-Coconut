import React from 'react';
import StackScreen from './src/route/stack/stack';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs(true);
console.disableYellowBox = ['Unable to symbolicate'];

export default function App() {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
}
