import React, {useState} from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4} from 'uuid';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFPercentage} from 'react-native-responsive-fontsize';

import Buttons from '../../reusable/Buttons/Buttons';
import {wp, hp} from '../../reusable/responsive/dimen';
import styles from './addTodoStyle.js';

export default function addTodo({navigation}) {
  const [newTodo, setNewTodo] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [category, setCategory] = useState('');
  const [othersCategory, setOthersCategory] = useState('');
  const [date, setDate] = useState('');
  const [checkDate, setCheckDate] = useState(false);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      console.log('success add');
    } catch (e) {
      console.log(e);
    }
  };

  const pushdata = async (newTodo, todoDescription, kategori, dueDate) => {
    let temp = await AsyncStorage.getItem('@storage_Key').then((item) =>
      JSON.parse(item),
    );
    const id = uuidv4();
    console.log('temp 1', temp);

    if (!checkDate) {
      dueDate = '';
    }

    if (category === 'Others') {
      kategori = othersCategory;
    }

    if (temp === null) {
      temp = {
        item: [],
      };
    }
    temp.item.push({
      id: id,
      todo: newTodo,
      description: todoDescription,
      category: kategori,
      dueTime: dueDate,
      done: false,
    });

    console.log('temp 2', temp);
    storeData(temp);
    navigation.replace('Home');
  };

  const pilihCategory = () => {
    let tambahan;
    if (category === 'Others') {
      tambahan = (
        <View>
          <TextInput
            style={styles.kolomRespon3}
            placeholder={'Category'}
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
            placeholder="Category"
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
          placeholder="Select Date"
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
      <View style={styles.modalView}>
        <View style={styles.back}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.goBack()}>
            <Ionicons
              name={'arrow-back-outline'}
              size={RFPercentage(5)}
              color={'white'}
            />
          </TouchableOpacity>
          <Text style={styles.title}>New Todo</Text>
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
          placeholder={'Todo ...'}
          placeholderTextColor={'#fff'}
          onChangeText={(e) => setNewTodo(e)}
        />
        <TextInput
          multiline
          style={styles.kolomRespon2}
          placeholder={'Todo Description ...'}
          textAlignVertical={'top'}
          placeholderTextColor={'#fff'}
          onChangeText={(e) => setTodoDescription(e)}
        />
        <View style={styles.button}>
          <Buttons
            text={'Create Todo'}
            press={() => pushdata(newTodo, todoDescription, category, date)}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
