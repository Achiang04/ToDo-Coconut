import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DeleteModal from '../../reusable/modal/deleteModal';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';

import styles from './homeStyle';
import {wp, hp} from '../../reusable/responsive/dimen';
import Buttons from '../../reusable/Buttons/Buttons';
import {todoAction} from '../../redux/Actions/todoAction';

export default function home({navigation}) {
  const dispatch = useDispatch();

  const [statusFilter, setStatusFilter] = useState('');
  const [statusSelected, setStatusSelected] = useState(false);
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

  const handleCompleteStorage = async (id) => {
    let item = await AsyncStorage.getItem('@storage_Key').then((item) =>
      JSON.parse(item),
    );

    item.item.map((data) => {
      if (data.id === id) {
        data.done = !data.done;
      }
    });
    const jsonValue = JSON.stringify(item);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
    dispatch(todoAction());
  };

  const RenderTodoStorage = ({item, index}) => {
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
          <Text style={styles.lewatText}>Missed</Text>
        </View>
      );
    }

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
          <DeleteModal id={item.id} done={item.done} />
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
              id: item.id,
              todo: item.todo,
              desc: item.description,
              category: item.category,
              date: item.dueTime,
              status: item.done,
            })
          }>
          <FontAwesome5
            name={'edit'}
            size={RFPercentage(2.5)}
            color={item.done ? '#6D26FB' : '#fff'}
          />
        </TouchableOpacity>
        <View style={styles.check}>
          <CheckBox
            disabled={false}
            value={item.done}
            tintColors={{true: '#6D26FB', false: '#fff'}}
            onValueChange={() => handleCompleteStorage(item.id)}
          />
        </View>
        {tambahan}
        {deleteIcon}
      </TouchableOpacity>
    );
  };

  const pilihStatus = () => {
    return (
      <View style={[styles.pilihJenjang]}>
        <DropDownPicker
          items={[
            {label: 'All', value: 'All'},
            {label: 'Done', value: 'true'},
            {label: 'On Progress', value: 'false'},
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
              setStatusSelected(false);
              setStatusFilter(item.value);
            } else {
              setStatusSelected(true);
              setStatusFilter(item.value);
            }
          }}
        />
      </View>
    );
  };

  console.log(data);
  console.log(data.item);

  let status;
  if (data === null || !(data.item && data.item.length)) {
    status = (
      <View style={styles.statusContainer}>
        <Text style={styles.status}>Your Todos Empty</Text>
      </View>
    );
  } else {
    if (statusSelected) {
      const tampungan = {
        item: [],
      };

      let filter;
      if (statusFilter === 'true') {
        filter = true;
      } else {
        filter = false;
      }

      data.item
        .filter((item) => item.done == filter)
        .map((statusFiltered) => {
          tampungan.item.push(statusFiltered);
        });

      if (tampungan.item.length === 0) {
        status = (
          <View style={styles.statusContainer}>
            <Text style={styles.status}>
              {filter ? 'No Todos Done' : 'Your Todos Empty'}
            </Text>
          </View>
        );
      } else {
        status = (
          <FlatList
            contentContainerStyle={{paddingBottom: hp(80)}}
            showsVerticalScrollIndicator={false}
            data={tampungan.item}
            extraData={selectedId}
            renderItem={({item, index}) => {
              return <RenderTodoStorage item={item} index={index} />;
            }}
          />
        );
      }
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos</Text>
      {pilihStatus()}
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
