import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Buttons from '../../reusable/buttons/buttons';
import styles from './homeStyle';

export default function home() {
  const [data] = useState([
    {
      id: 1,
      todo: 'makan',
      description: 'makan siang jam 12 nanti',
      done: false,
    },
    {
      id: 2,
      todo: 'tidur',
      description: 'makan siang jam 12 nanti',
      done: true,
    },
    {
      id: 3,
      todo: 'main',
      description: 'makan siang jam 12 nanti',
      done: false,
    },
  ]);

  const RenderTodo = ({item}) => {
    return item.done ? (
      <TouchableOpacity style={styles.todoContainerSelected}>
        <Text style={styles.todoTextSelected}>{item.todo}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.todoContainer}>
        <Text style={styles.todoText}>{item.todo}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return <RenderTodo item={item} />;
        }}
      />
      <View style={styles.button}>
        <Buttons text={'New Todo'} />
      </View>
    </View>
  );
}
