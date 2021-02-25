import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import styles from './homeStyle';
import Modal from '../../reusable/modal/modal';

export default function home() {
  const [data, setData] = useState({
    item: [
      {
        id: 1,
        todo: 'Lunch',
        description: 'Lunch will be at 1 pm',
        done: false,
      },
      {
        id: 2,
        todo: 'Take a nap',
        description: 'tidur siang jam 2 nanti',
        done: true,
      },
      {
        id: 3,
        todo: 'Watching',
        description: 'main jam 4 nanti',
        done: false,
      },
      {
        id: 4,
        todo: 'Buy a cake',
        description: 'makan siang jam 6 nanti',
        done: true,
      },
    ],
  });

  const handleComplete = (index) => {
    let {item} = {...data};
    item[index]['done'] = !item[index]['done'];
    setData({item});
  };

  const RenderTodo = ({item, index}) => {
    return item.done ? (
      <TouchableOpacity
        style={styles.todoContainerSelected}
        onPress={() => handleComplete(index)}>
        <Text style={styles.todoTextSelected}>{item.todo}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles.todoContainer}
        onPress={() => handleComplete(index)}>
        <Text style={styles.todoText}>{item.todo}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos</Text>
      <View>
        <FlatList
          data={data.item}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item, index}) => {
            return <RenderTodo item={item} index={index} />;
          }}
        />
      </View>
      <View style={styles.button}>
        <Modal />
      </View>
    </View>
  );
}
