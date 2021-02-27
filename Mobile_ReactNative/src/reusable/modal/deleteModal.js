import React, {useState} from 'react';
import {
  Alert,
  Modal,
  TouchableOpacity,
  Text,
  Pressable,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {todoAction} from '../../redux/Actions/todoAction';

import styles from './deleteModalStyle.js';

const DeleteModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const index = props.index;
  const dispatch = useDispatch();

  console.log(index);

  const handleDeleteStorage = async (index) => {
    let item = await AsyncStorage.getItem('@storage_Key').then((item) =>
      JSON.parse(item),
    );
    console.log('data delete', item);
    console.log('nomor', index);
    item.item.splice(index, 1);
    const jsonValue = JSON.stringify(item);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
    dispatch(todoAction());
    console.log(`success delete index ${index}`);
  };

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete it ?
            </Text>
            <View style={styles.row}>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.yesButton}
                onPress={() => [
                  setModalVisible(!modalVisible),
                  handleDeleteStorage(index),
                ]}>
                <Text style={styles.textStyle}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <Ionicons
          name={'trash-outline'}
          size={RFPercentage(3)}
          color={props.done ? '#6D26FB' : '#fff'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DeleteModal;
