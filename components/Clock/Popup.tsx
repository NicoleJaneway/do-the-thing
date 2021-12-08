import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    flex: 0,
    width: "100%",
  },
  textInput: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.primary,
    width: 200,
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const Popup = ({ task, displayTime, modalVisible, setModalVisible }) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text>{displayTime}</Text>
          <Text>Your original task was:</Text>
          <Text>{task}</Text>
          <Text>Log what you're working on:</Text>
          <TextInput style={styles.textInput} />
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text>Hide Modal</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default Popup;
