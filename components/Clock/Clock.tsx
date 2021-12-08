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
    marginTop: 10,
    marginBottom: 20,
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
  pressable: {
    height: 30,
    width: 100,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
  },
});

export default function Clock({ task, sessionLength, logs, setLogs }) {
  const initialTime = sessionLength * 60 * 1000;
  const [currentTask, setCurrentTask] = useState("");
  const [countdownTime, setCountdownTime] = useState(initialTime);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [displayTime, setDisplayTime] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkinCount, setCheckinCount] = useState(1);

  let totalCheckins = 3;

  if (sessionLength === 32) {
    totalCheckins = 4;
  } else if (sessionLength === 50) {
    totalCheckins = 6;
  }

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

    // elapsedTime % (8 * 60 *1000) === 0

    if (elapsedTime % 4000 === 0) {
      setModalVisible(true);
    }
  }, [countdownTime]);

  useEffect(() => {
    console.log("From Clock: " + logs);
  }, [logs]);

  const handlePress = () => {
    setModalVisible(!modalVisible);
    setCheckinCount(checkinCount + 1);
    if (currentTask !== "") {
      const updatedLogs = [...logs, currentTask];
      setLogs(updatedLogs);
    }
    setCurrentTask("");
  };

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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  marginBottom: 20,
                }}
              >
                <Text>
                  Checkin {checkinCount} of {totalCheckins}
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                    color: theme.colors.textSecondary,
                  }}
                >
                  {displayTime}
                </Text>
              </View>
              <Text>Your original task was:</Text>
              <Text style={{ marginTop: 5, marginBottom: 20 }}>{task}</Text>
              <Text>Log what you're currently working on:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={setCurrentTask}
                value={currentTask}
              />
              <Pressable style={styles.pressable} onPress={handlePress}>
                <Text
                  style={{
                    textAlign: "center",
                    padding: 6,
                    color: "white",
                  }}
                >
                  Submit
                </Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      </View>
    </>
  );
}
