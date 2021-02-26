import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './homeStyle';
import Modal from '../../reusable/modal/modal';

export default function home() {
  const [selectedId, setSelectedId] = useState(null);
  const [dataStorage, setDataStorage] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      setDataStorage(JSON.parse(jsonValue));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log('dataStorage', dataStorage);
  console.log(selectedId);

  const handleCompleteStorage = (index) => {
    let {item} = {...dataStorage};
    item[index]['done'] = !item[index]['done'];
    setDataStorage({item});
  };

  const RenderTodoStorage = ({item, index}) => {
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
            onValueChange={() => handleCompleteStorage(index)}
          />
        </View>
        {tambahan}
      </TouchableOpacity>
    );
  };

  let status;
  if (dataStorage.item == 0) {
    status = (
      <View>
        <Text style={styles.status}>Your todos empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos</Text>
      <View>
        {/* <FlatList
          data={data.item}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedId}
          renderItem={({item, index}) => {
            return <RenderTodo item={item} index={index} />;
          }}
        /> */}
        {status}
        <FlatList
          data={dataStorage.item}
          extraData={selectedId}
          renderItem={({item, index}) => {
            return <RenderTodoStorage item={item} index={index} />;
          }}
        />
      </View>
      <View style={styles.button}>
        <Modal />
      </View>
    </View>
  );
}
