import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
} from "react-native";

import TimerDisplay from "./TimerDisplay";
import Controls from "./Controls";
import Popup from "./Popup";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
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
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 20,
    marginRight: 20,
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
});

// elapsedTime % (8 *60 *1000) === 0

export default function Clock({ task, sessionLength }) {
  const initialTime = sessionLength * 60 * 1000;
  const [countdownTime, setCountdownTime] = useState(initialTime);
  const [elapsedTime, setElapsedTime] = useState(0);

  const [displayTime, setDisplayTime] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const convert = (ms) => {
    let seconds: number = Math.floor((ms / 1000) % 60);
    let minutes: number = Math.floor(ms / (1000 * 60));

    let minutesString: string =
      minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    let secondsString: string =
      seconds < 10 ? "0" + seconds.toString() : seconds.toString();

    return minutesString + ":" + secondsString;
  };

  useEffect(() => {
    setDisplayTime(convert(countdownTime));
    setElapsedTime(initialTime - countdownTime);

    if (elapsedTime === 5000) {
      setModalVisible(true);
    }
  }, [countdownTime]);

  if (countdownTime)
    return (
      <>
        <View style={styles.container}>
          <Text style={{ fontSize: 20 }}>do the thing</Text>
          <TimerDisplay displayTime={displayTime} task={task} />
          <Controls
            countdownTime={countdownTime}
            setCountdownTime={setCountdownTime}
          />
          <View>
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
        </View>
      </>
    );
}
