import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './buttonsStyle';

export default function Buttons(props) {
  return (
    <TouchableOpacity onPress={props.press}>
      <View style={styles.button}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}
