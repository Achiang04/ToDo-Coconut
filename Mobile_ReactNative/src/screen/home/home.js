import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './homeStyle';
import Modal from '../../reusable/modal/modal';
import {hp} from '../../reusable/responsive/dimen';

export default function home({navigation}) {
  const [selectedId, setSelectedId] = useState(null);
  const [dataStorage, setDataStorage] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      setDataStorage(JSON.parse(jsonValue));
      return JSON.parse(jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();

    const unsubscribe = navigation.addListener(() => {
      getData();
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  // console.log('dataStorage', dataStorage);
  // console.log('item', dataStorage.item);
  // console.log(selectedId);

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
  if (dataStorage === null) {
    status = (
      <View style={styles.statusContainer}>
        <Text style={styles.status}>Your todos empty</Text>
      </View>
    );
  } else {
    status = (
      <FlatList
        contentContainerStyle={{marginBottom: hp(80)}}
        showsVerticalScrollIndicator={false}
        data={dataStorage.item}
        extraData={selectedId}
        renderItem={({item, index}) => {
          return <RenderTodoStorage item={item} index={index} />;
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos</Text>
      <ScrollView>{status}</ScrollView>
      <View style={styles.button}>
        <Modal />
      </View>
    </View>
  );
}
