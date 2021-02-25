import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screen/home/home';

const Stack = createStackNavigator();

export default function StackScreen() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
