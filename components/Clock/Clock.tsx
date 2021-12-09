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
});

export default function Clock({ task, sessionLength, logs, setLogs }) {
  const initialTime = sessionLength * 60 * 1000;
  const [countdownTime, setCountdownTime] = useState(initialTime);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [displayTime, setDisplayTime] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const convert = (ms: number) => {
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

    //elapsedTime % (8 * 60 * 1000)

    if (elapsedTime > 0 && elapsedTime % 4000 === 0) {
      setModalVisible(true);
    }
  }, [countdownTime]);

  useEffect(() => {
    console.log("From Clock: " + logs);
  }, [logs]);

  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>do the thing</Text>
        <TimerDisplay displayTime={displayTime} task={task} />
        <Controls
          countdownTime={countdownTime}
          setCountdownTime={setCountdownTime}
        />
        <Popup
          sessionLength={sessionLength}
          task={task}
          displayTime={displayTime}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          logs={logs}
          setLogs={setLogs}
        />
      </View>
    </>
  );
}
