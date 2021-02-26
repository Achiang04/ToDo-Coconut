import React, {useState} from 'react';
import {
  Modal,
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

import {wp, hp} from '../../reusable/responsive/dimen';
import styles from './modalStyle';

export default function App({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [category, setCategory] = useState('');
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

  const pushdata = async (newTodo, todoDescription, category, dueDate) => {
    let temp = await AsyncStorage.getItem('@storage_Key').then((item) =>
      JSON.parse(item),
    );
    const id = uuidv4();
    console.log('temp 1', temp);
    if (temp === null) {
      temp = {
        item: [],
      };
    }
    temp.item.push({
      id: id,
      todo: newTodo,
      description: todoDescription,
      category: category,
      dueTime: dueDate,
      done: false,
    });

    console.log('temp 2', temp);
    storeData(temp);
    navigation.navigate('Home');
  };

  const pilihCategory = () => {
    let tambahan;
    if (category === 'others') {
      tambahan = (
        <View>
          <TextInput
            style={styles.kolomRespon3}
            placeholder={'Category'}
            onChangeText={(e) => setNewTodo(e)}
          />
        </View>
      );
    }
    return (
      <View>
        <View style={[styles.pilihJenjang]}>
          <DropDownPicker
            items={[
              {label: 'Work', value: 'work'},
              {label: 'Health', value: 'health'},
              {label: 'Meeting', value: 'meeting'},
              {label: 'Cooking', value: 'cooking'},
              {label: 'Payment', value: 'payment'},
              {label: 'Ideas', value: 'ideas'},
              {label: 'Others', value: 'others'},
            ]}
            style={styles.dropStyle}
            dropDownStyle={{backgroundColor: '#F3F3F3'}}
            activeLabelStyle={{color: '#6D26FB'}}
            defaultNull
            labelStyle={styles.labelStyle}
            placeholder="Category"
            containerStyle={{height: hp(30)}}
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
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
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
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>New Todo</Text>
              <View style={styles.row}>
                <CheckBox
                  value={checkDate}
                  tintColors={{true: '#6D26FB', false: 'black'}}
                  onValueChange={() => setCheckDate(!checkDate)}
                />
                <Text style={styles.useDate}>Do you want to use Date ?</Text>
              </View>
              <View style={styles.useDate}>{pilihTanggal()}</View>
              <View>{pilihCategory()}</View>
              <TextInput
                style={styles.kolomRespon1}
                placeholder={'Todo ...'}
                onChangeText={(e) => setNewTodo(e)}
              />
              <TextInput
                multiline
                style={styles.kolomRespon2}
                placeholder={'Todo Description ...'}
                textAlignVertical={'top'}
                onChangeText={(e) => setTodoDescription(e)}
              />
              <TouchableOpacity
                style={styles.create}
                onPress={() => {
                  setModalVisible(!modalVisible),
                    pushdata(newTodo, todoDescription, category, date);
                }}>
                <Text style={styles.textButton}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textButton}>New Todo</Text>
      </TouchableOpacity>
    </View>
  );
}
