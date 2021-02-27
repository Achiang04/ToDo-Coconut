import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFPercentage} from 'react-native-responsive-fontsize';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';

import Buttons from '../../reusable/Buttons/Buttons';
import styles from './editTodoStyle';
import {wp, hp} from '../../reusable/responsive/dimen';

export default function editTodo(props) {
  const [checkDate, setCheckDate] = useState(false);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [newTodo, setNewTodo] = useState('');
  const [othersCategory, setOthersCategory] = useState('');
  const index = props.route.params.index;

  if (!props.route.params.date === '') {
    setCheckDate(true);
    console.log('checkDate', checkDate);
  }

  const editTodo = async (index, newTodo, desc, kategori, dueDate) => {
    let item = await AsyncStorage.getItem('@storage_Key').then((item) =>
      JSON.parse(item),
    );

    if (dueDate === '') {
      dueDate = props.route.params.date;
    } else if (!checkDate) {
      dueDate = '';
    }

    if (kategori === '') {
      kategori = props.route.params.category;
    } else if (kategori === 'Others') {
      kategori = othersCategory;
    }

    if (newTodo === '') {
      newTodo = props.route.params.todo;
    }

    if (desc === '') {
      desc = props.route.params.desc;
    }

    item.item[index]['todo'] = newTodo;
    item.item[index]['description'] = desc;
    item.item[index]['category'] = kategori;
    item.item[index]['dueTime'] = dueDate;

    const jsonValue = JSON.stringify(item);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
    props.navigation.replace('Home');
    dispatch(todoAction());
  };

  const pilihCategory = () => {
    let tambahan;
    if (category === 'Others') {
      tambahan = (
        <View>
          <TextInput
            style={styles.kolomRespon3}
            placeholder={props.route.params.category}
            placeholderTextColor={'#fff'}
            onChangeText={(e) => setOthersCategory(e)}
          />
        </View>
      );
    }

    return (
      <View>
        <View style={[styles.pilihJenjang]}>
          <DropDownPicker
            items={[
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
            placeholder={
              props.route.params.category === ''
                ? 'Category'
                : props.route.params.category
            }
            containerStyle={{height: hp(40)}}
            onChangeItem={(item) => {
              setCategory(item.value);
            }}
          />
        </View>
        {tambahan}
      </View>
    );
  };

  const pilihTanggal = () => {
    if (checkDate) {
      return (
        <DatePicker
          style={styles.datePickerStyle}
          date={date}
          mode="date"
          placeholder={
            props.route.params.date === ''
              ? 'Select Date'
              : props.route.params.date
          }
          format="DD-MM-YYYY"
          minDate="01-01-2015"
          maxDate="01-01-2030"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
              borderColor: '#fff',
              borderRadius: 5,
            },
            dateText: {
              color: '#fff',
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
      );
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <View style={styles.back}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.navigation.goBack()}>
            <Ionicons
              name={'arrow-back-outline'}
              size={RFPercentage(5)}
              color={'white'}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Update Todo</Text>
        </View>
        <View style={styles.row}>
          <CheckBox
            value={checkDate}
            tintColors={{true: '#6D26FB', false: '#fff'}}
            onValueChange={() => setCheckDate(!checkDate)}
          />
          <TouchableOpacity onPress={() => setCheckDate(!checkDate)}>
            <Text style={styles.useDate}>Do you want to use Date ?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tanggalContainer}>{pilihTanggal()}</View>
        <View>{pilihCategory()}</View>
        <TextInput
          style={styles.kolomRespon1}
          placeholder={props.route.params.todo}
          placeholderTextColor={'#fff'}
          onChangeText={(e) => setNewTodo(e)}
        />
        <TextInput
          multiline
          style={styles.kolomRespon2}
          placeholder={props.route.params.desc}
          textAlignVertical={'top'}
          placeholderTextColor={'#fff'}
          onChangeText={(e) => setTodoDescription(e)}
        />
        <View style={styles.button}>
          <Buttons
            text={'Update Todo'}
            press={() =>
              editTodo(index, newTodo, todoDescription, category, date)
            }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
