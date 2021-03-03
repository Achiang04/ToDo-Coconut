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
import {useDispatch} from 'react-redux';
import moment from 'moment';

import Buttons from '../../reusable/Buttons/Buttons';
import styles from './editTodoStyle';
import {wp, hp} from '../../reusable/responsive/dimen';
import {todoAction} from '../../redux/Actions/todoAction';

export default function editTodo(props) {
  const dispatch = useDispatch();

  const [checkDate, setCheckDate] = useState(false);
  const [validTOdo, setValidTodo] = useState(true);
  const [othersCategory, setOthersCategory] = useState('');
  const index = props.route.params.index;
  const [data, setData] = useState({
    todo: props.route.params.todo,
    desc: props.route.params.desc,
    category: props.route.params.category,
    date: props.route.params.date,
  });

  if (!data.date === '') {
    setCheckDate(true);
  }

  const editTodo = async (index, newTodo, desc, kategori, dueDate) => {
    let item = await AsyncStorage.getItem('@storage_Key').then((item) =>
      JSON.parse(item),
    );

    if (dueDate === '') {
      dueDate = data.date;
    } else if (!checkDate) {
      dueDate = '';
    }

    if (kategori === '') {
      kategori = data.category;
    } else if (kategori === 'Others') {
      kategori = {others: 'Others', category: othersCategory};
    }

    if (newTodo === '') {
      newTodo = data.todo;
    }

    if (desc === '') {
      desc = data.desc;
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
    if (data.category.others === 'Others') {
      tambahan = (
        <View>
          <TextInput
            style={styles.kolomRespon3}
            placeholder={data.category.category}
            placeholderTextColor={'#fff'}
            onChangeText={(e) => setOthersCategory(e)}
            value={othersCategory}
          />
        </View>
      );
    } else if (data.category === 'Others') {
      tambahan = (
        <View>
          <TextInput
            style={styles.kolomRespon3}
            placeholder={othersCategory}
            placeholderTextColor={'#fff'}
            onChangeText={(e) => setOthersCategory(e)}
            value={othersCategory}
          />
        </View>
      );
    }

    let kondisi;
    if (data.category.others === 'Others') {
      kondisi = data.category.others === '' ? 'Category' : data.category.others;
    } else {
      kondisi = data.category === '' ? 'Category' : data.category;
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
            placeholder={kondisi}
            containerStyle={{height: hp(40)}}
            onChangeItem={(item) => {
              setData({...data, ['category']: item.value});
            }}
          />
        </View>
        {tambahan}
      </View>
    );
  };

  const pilihTanggal = () => {
    const now = moment().format('YYYY-MM-DD');
    if (checkDate) {
      return (
        <DatePicker
          style={styles.datePickerStyle}
          date={data.date}
          mode="date"
          placeholder={data.date === '' ? 'Select Date' : data.date}
          format="YYYY-MM-DD"
          minDate={now}
          maxDate="2030-01-01"
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
            setData({...data, ['date']: date});
          }}
        />
      );
    }
  };

  let valid;
  if (validTOdo === false) {
    valid = (
      <Text style={styles.validText}>
        {' '}
        ** Todo can't be empty and at least 3 letters
      </Text>
    );
  }

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
          placeholder={data.todo === '' ? '...' : data.todo}
          placeholderTextColor={'#fff'}
          onChangeText={(e) => setData({...data, ['todo']: e})}
          value={data.todo}
        />
        {valid}
        <TextInput
          multiline
          style={styles.kolomRespon2}
          placeholder={data.desc === '' ? '...' : data.desc}
          textAlignVertical={'top'}
          placeholderTextColor={'#fff'}
          onChangeText={(e) => setData({...data, ['desc']: e})}
          value={data.desc}
        />
        <View style={styles.button}>
          <Buttons
            text={'Update Todo'}
            press={() => {
              if (data.todo === '') {
                setValidTodo(false);
              } else if (data.todo.length <= 2) {
                setValidTodo(false);
              } else {
                editTodo(index, data.todo, data.desc, data.category, data.date);
              }
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
