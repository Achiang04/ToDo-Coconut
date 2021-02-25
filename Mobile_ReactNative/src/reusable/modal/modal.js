import React, {useState} from 'react';
import {Modal, TextInput, Text, TouchableOpacity, View} from 'react-native';

import styles from './modalStyle';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [todoDescription, setTodoDescription] = useState('');

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>New Todo</Text>
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
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textButton}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textButton}>New Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
