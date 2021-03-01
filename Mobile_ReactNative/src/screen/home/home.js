import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DeleteModal from '../../reusable/modal/deleteModal';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';

import styles from './homeStyle';
import {hp} from '../../reusable/responsive/dimen';
import Buttons from '../../reusable/Buttons/Buttons';
import {todoAction} from '../../redux/Actions/todoAction';

export default function home({navigation}) {
  const dispatch = useDispatch();

  const [category, setCategory] = useState('');
  const [categorySelected, setCategorySelected] = useState(false);
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

  // console.log('Data', data);

  const handleCompleteStorage = async (index) => {
    let item = await AsyncStorage.getItem('@storage_Key').then((item) =>
      JSON.parse(item),
    );
    item.item[index]['done'] = !item.item[index]['done'];
    const jsonValue = JSON.stringify(item);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
    dispatch(todoAction());
  };

  const handleFilterCategory = async (category) => {
    let dataTemp = [];

    if (category !== '') {
      {
        await data.item
          .filter((item) => item.category === category)
          .map((filteredCategory) => {
            // console.log('filteredCategory', filteredCategory);
            dataTemp.push(filteredCategory);
          });
      }
    }
    // console.log('data hasil filter ?', dataTemp);
    return dataTemp;
  };

  console.log('data', data);

  const RenderTodoStorage = ({item, index}) => {
    console.log('index di render', index);

    let d = item.dueTime.slice(8, 10);
    let m = item.dueTime.slice(5, 7);
    let y = item.dueTime.slice(0, 4);
    let dateFormat = ` ${d} - ${m} - ${y}`;

    let time;
    if (item.dueTime === undefined || item.dueTime === '') {
      time = <Text>Date: -</Text>;
    } else {
      time = <Text>Date: {dateFormat}</Text>;
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

    console.log(item.category);
    let category;
    if (item.category === undefined || item.category === '') {
      category = null;
    } else {
      if (item.category.others === 'Others') {
        category = (
          <View style={styles.row}>
            <View style={styles.categoryContainer}>
              <Text
                style={
                  item.done ? styles.categoryTextSelected : styles.categoryText
                }>
                {item.category.others}
              </Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text
                style={
                  item.done ? styles.categoryTextSelected : styles.categoryText
                }>
                {item.category.category}
              </Text>
            </View>
          </View>
        );
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
  if (data === null || data.length === 0) {
    status = (
      <View style={styles.statusContainer}>
        <Text style={styles.status}>Your todos empty</Text>
      </View>
    );
  } else {
    if (categorySelected) {
      const tampungan = {
        item: [],
      };
      handleFilterCategory(category).then((data) => {
        data.map((e) => tampungan.item.push(e));
      });
      console.log('tampungan   1', tampungan.item);
      status = (
        <FlatList
          contentContainerStyle={{paddingBottom: hp(80)}}
          showsVerticalScrollIndicator={false}
          data={tampungan.item}
          extraData={selectedId}
          renderItem={({item, index}) => {
            let trueIndex = index + 1;
            return <RenderTodoStorage item={item} index={trueIndex} />;
          }}
        />
      );
    } else {
      status = (
        <FlatList
          contentContainerStyle={{paddingBottom: hp(80)}}
          showsVerticalScrollIndicator={false}
          data={data.item}
          extraData={selectedId}
          renderItem={({item, index}) => {
            return <RenderTodoStorage item={item} index={index} />;
          }}
        />
      );
    }
  }

  console.log('status', status);

  const pilihCategory = () => {
    return (
      <View style={[styles.pilihJenjang]}>
        <DropDownPicker
          items={[
            {label: 'All', value: 'All'},
            {label: 'Work', value: 'Work'},
            {label: 'Health', value: 'Health'},
            {label: 'Meeting', value: 'Meeting'},
            {label: 'Cooking', value: 'Cooking'},
            {label: 'Payment', value: 'Payment'},
            {label: 'Ideas', value: 'Ideas'},
            {label: 'Others', value: 'Others'},
          ]}
          style={styles.dropStyle}
          dropDownStyle={{backgroundColor: '#6D26FB'}}
          activeLabelStyle={{color: 'pink'}}
          defaultNull
          labelStyle={styles.labelStyle}
          placeholder="All"
          containerStyle={{height: hp(40)}}
          onChangeItem={(item) => {
            if (item.value === 'All') {
              setCategorySelected(false);
              setCategory(item.value);
            } else {
              setCategorySelected(true);
              setCategory(item.value);
            }
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos</Text>
      {pilihCategory()}
      {status}
      <View style={styles.button}>
        <Buttons
          text={'New Todo'}
          press={() => navigation.navigate('AddTodo')}
        />
      </View>
    </View>
  );
}
