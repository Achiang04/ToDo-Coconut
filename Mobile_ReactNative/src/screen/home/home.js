import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeleteModal from '../../reusable/modal/deleteModal';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import styles from './homeStyle';
import {hp} from '../../reusable/responsive/dimen';
import Buttons from '../../reusable/Buttons/Buttons';
import {todoAction} from '../../redux/Actions/todoAction';

export default function home({navigation}) {
  const dispatch = useDispatch();

  const [selectedId, setSelectedId] = useState(null);
  const data = useSelector((state) => state.todoReducer.data);

  useEffect(() => {
    dispatch(todoAction());

    const unsubscribe = navigation.addListener(() => {
      dispatch(todoAction());
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  console.log('Data', data);

  const handleCompleteStorage = async (index) => {
    let item = await AsyncStorage.getItem('@storage_Key').then((item) =>
      JSON.parse(item),
    );
    item.item[index]['done'] = !item.item[index]['done'];
    const jsonValue = JSON.stringify(item);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
    dispatch(todoAction());
  };

  const checkDueDate = async (index, date) => {
    let item = await AsyncStorage.getItem('@storage_Key').then((item) =>
      JSON.parse(item),
    );
    const limit = moment(date);
    const now = moment().format('YYYY-MM-DD');
    // console.log('now', now);
    // console.log('limit', limit);

    if (limit.isValid() && moment(now).isAfter(limit)) {
      item.item[index]['lewat'] = true;
      const jsonValue = JSON.stringify(item);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    }
  };

  const RenderTodoStorage = ({item, index}) => {
    checkDueDate(index, item.dueTime);

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

    let lewat;
    if (item.lewat) {
      lewat = (
        <View style={styles.lewatContainer}>
          <Text
            style={
              item.lewat ? styles.categoryTextSelected : styles.categoryText
            }>
            Missed
          </Text>
        </View>
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

    let deleteIcon;
    if (item.id === selectedId) {
      deleteIcon = (
        <View style={styles.delete}>
          <DeleteModal index={index} done={item.done} />
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={item.done ? styles.todoContainerSelected : styles.todoContainer}
        onPress={() => setSelectedId(item.id)}>
        <View style={styles.row}>
          {lewat}
          {category}
        </View>
        <Text style={item.done ? styles.todoTextSelected : styles.todoText}>
          {item.todo}
        </Text>
        <TouchableOpacity
          style={styles.edit}
          onPress={() =>
            navigation.navigate('editTodo', {
              index: index,
              todo: item.todo,
              desc: item.description,
              category: item.category,
              date: item.dueTime,
              status: item.done,
            })
          }>
          <FontAwesome5
            name={'edit'}
            size={RFPercentage(2.4)}
            color={item.done ? '#6D26FB' : '#fff'}
          />
        </TouchableOpacity>
        <View style={styles.check}>
          <CheckBox
            disabled={false}
            value={item.done}
            tintColors={{true: '#6D26FB', false: '#fff'}}
            onValueChange={() => handleCompleteStorage(index)}
          />
        </View>
        {tambahan}
        {deleteIcon}
      </TouchableOpacity>
    );
  };

  let status;
  if (data === null) {
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
        data={data.item}
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
