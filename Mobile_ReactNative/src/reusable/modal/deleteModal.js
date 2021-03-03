import React, {useState} from 'react';
import {Modal, TouchableOpacity, Text, Pressable, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {todoAction} from '../../redux/Actions/todoAction';

import styles from './deleteModalStyle.js';

const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const id = props.id;

  const handleDeleteStorage = async (id) => {
    let item = await AsyncStorage.getItem('@storage_Key').then((item) =>
      JSON.parse(item),
    );

    item.item.splice(
      item.item.findIndex(function (i) {
        return i.id === id;
      }),
      1,
    );

    const jsonValue = JSON.stringify(item);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
    dispatch(todoAction());
  };

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
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
                  handleDeleteStorage(id),
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
