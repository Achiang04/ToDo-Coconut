import React, {useState} from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4} from 'uuid';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFPercentage} from 'react-native-responsive-fontsize';
import moment from 'moment';

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
  const [validTOdo, setValidTodo] = useState(true);
  // const [validTOdoLength, setValidTodoLength] = useState(true);
  const [validCategory, setValidCategory] = useState(true);

  const pushdata = async (newTodo, todoDescription, kategori, dueDate) => {
    let temp = await AsyncStorage.getItem('@storage_Key')
      .then((item) => JSON.parse(item))
      .catch((e) => {
        throw e;
      });

    const id = uuidv4();

    if (!checkDate) {
      dueDate = '';
    }

    if (category === 'Others') {
      kategori = {others: 'Others', category: othersCategory};
    }

    if (temp === null) {
      temp = {
        item: [],
      };
    }

    temp.item.unshift({
      id: id,
      todo: newTodo,
      description: todoDescription,
      category: kategori,
      dueTime: dueDate,
      lewat: false,
      done: false,
    });

    const jsonValue = JSON.stringify(temp);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
    navigation.replace('Home');
  };

  let categoryValid;
  if (validCategory === false) {
    categoryValid = (
      <Text style={styles.validText}>
        {/* {' '} */}
        ** Category can't be empty and at least 3 letters
      </Text>
    );
  }

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
          {categoryValid}
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
    const now = moment().format('YYYY-MM-DD');
    if (checkDate) {
      return (
        <DatePicker
          style={styles.datePickerStyle}
          date={date}
          mode="date"
          placeholder="Select Date"
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
            setDate(date);
          }}
        />
      );
    }
  };

  let valid;
  if (validTOdo === false) {
    valid = (
      <Text style={styles.validText}>
        {/* {' '} */}
        ** Todo can't be empty and at least 3 letters
      </Text>
    );
  }

  let validLength;
  if (newTodo.length === 20) {
    validLength = (
      <Text style={styles.validText}>
        {/* {' '} */}
        ** Todo is Max you can only input 100
      </Text>
    );
  }

  let secondInput = '';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
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
            maxLength={20}
            style={styles.kolomRespon1}
            placeholder={'Todo ...'}
            placeholderTextColor={'#fff'}
            onChangeText={(e) => setNewTodo(e)}
            returnKeyType="next"
            onSubmitEditing={() => secondInput.focus()}
            blurOnSubmit={false}
          />
          {valid}
          {validLength}
          <TextInput
            multiline={true}
            style={styles.kolomRespon2}
            placeholder={'Todo Description ...'}
            textAlignVertical={'top'}
            placeholderTextColor={'#fff'}
            onChangeText={(e) => setTodoDescription(e)}
            ref={(ref) => {
              secondInput = ref;
            }}
          />
          <View style={styles.button}>
            <Buttons
              text={'Create Todo'}
              press={() => {
                if (newTodo === '') {
                  setValidTodo(false);
                } else if (newTodo.length <= 2) {
                  setValidTodo(false);
                } else if (category === 'Others' && othersCategory === '') {
                  setValidCategory(false);
                } else if (
                  category === 'Others' &&
                  othersCategory.length <= 2
                ) {
                  setValidCategory(false);
                } else {
                  pushdata(newTodo, todoDescription, category, date);
                }
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
