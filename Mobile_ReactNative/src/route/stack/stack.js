import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screen/home/home';
import addTodo from '../../screen/addTodo/addTodo';
import editTodo from '../../screen/editTodo/editTodo';

const Stack = createStackNavigator();

export default function StackScreen() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddTodo" component={addTodo} />
      <Stack.Screen name="editTodo" component={editTodo} />
    </Stack.Navigator>
  );
}
