import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import styles from './homeStyle';
import Modal from '../../reusable/modal/modal';

export default function home() {
  const [selectedId, setSelectedId] = useState(null);
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
        description: 'take a nap at 2 later',
        done: true,
      },
      {
        id: 3,
        todo: 'Watching',
        description: 'watching nobita s2 this afternoon',
        done: false,
      },
      {
        id: 4,
        todo: 'Buy cake',
        description: 'buy cake tonight',
        done: true,
      },
    ],
  });

  const handleComplete = (index) => {
    let {item} = {...data};
    item[index]['done'] = !item[index]['done'];
    setData({item});
  };

  console.log(selectedId);

  const RenderTodo = ({item, index}) => {
    let tambahan;
    if (item.id === selectedId) {
      tambahan = (
        <View style={styles.tambahan}>
          <Text
            style={
              item.done
                ? styles.todoTextTambahanSelected
                : styles.todoTextTambahan
            }>
            Description: {'\n'}
            {item.description}
          </Text>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={item.done ? styles.todoContainerSelected : styles.todoContainer}
        onPress={() => setSelectedId(item.id)}>
        <Text style={item.done ? styles.todoTextSelected : styles.todoText}>
          {item.todo}
        </Text>
        <View style={styles.check}>
          <CheckBox
            disabled={false}
            value={item.done}
            onValueChange={() => handleComplete(index)}
          />
        </View>
        {tambahan}
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
          extraData={selectedId}
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
