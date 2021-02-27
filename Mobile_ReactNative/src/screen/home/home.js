import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SwipeListView} from 'react-native-swipe-list-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFPercentage} from 'react-native-responsive-fontsize';

import styles from './homeStyle';
import {hp} from '../../reusable/responsive/dimen';
import Buttons from '../../reusable/Buttons/Buttons';

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

  console.log(dataStorage);

  const RenderTodoStorage = ({item, index}) => {
    // console.log(item.dueTime);
    let time;
    if (item.dueTime === undefined || item.dueTime === '') {
      time = <Text>Date: -</Text>;
    } else {
      time = <Text>Date: {item.dueTime}</Text>;
    }

    let desc;
    if (item.description === undefined || item.description === '') {
      desc = <Text>Description: -</Text>;
    } else {
      desc = (
        <Text>
          Description: {'\n'}
          {item.description}
        </Text>
      );
    }

    let category;
    if (item.category === undefined || item.category === '') {
      category = null;
    } else {
      category = (
        <View style={styles.categoryContainer}>
          <Text
            style={
              item.done ? styles.categoryTextSelected : styles.categoryText
            }>
            {item.category}
          </Text>
        </View>
      );
    }

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
            {time} {'\n'}
            {'\n'}
            {desc}
          </Text>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={item.done ? styles.todoContainerSelected : styles.todoContainer}
        onPress={() => setSelectedId(item.id)}>
        {category}
        <Text style={item.done ? styles.todoTextSelected : styles.todoText}>
          {item.todo}
        </Text>
        <View style={styles.edit}>
          <TouchableOpacity>
            <FontAwesome5
              name={'edit'}
              size={RFPercentage(2.8)}
              color={item.done ? '#6D26FB' : '#fff'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.check}>
          <CheckBox
            disabled={false}
            value={item.done}
            tintColors={{true: '#6D26FB', false: '#fff'}}
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
        <Buttons
          text={'New Todo'}
          press={() => navigation.navigate('AddTodo')}
        />
      </View>
    </View>
  );
}
