import React, { useState, useContext, useEffect } from "react";
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
import EnvContext from "../../EnvContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
});

const prodSettings = {
  numberOfSeconds: 60,
  checkin: 8 * 60 * 1000,
};

const testSettings = {
  numberOfSeconds: 2,
  checkin: 4000,
};

export default function Clock({ task, sessionLength, logs, setLogs }) {
  const environment = useContext(EnvContext);
  const settings = environment === "prod" ? prodSettings : testSettings;

  const initialTime = sessionLength * settings.numberOfSeconds * 1000;
  const [countdownTime, setCountdownTime] = useState(initialTime);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [displayTime, setDisplayTime] = useState("");
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

    if (elapsedTime > 0 && elapsedTime % settings.checkin === 0) {
      setModalVisible(true);
    }
  }, [countdownTime]);

  useEffect(() => {
    console.log("From Clock: " + logs);
  }, [logs]);

  return (
    <>
      <View style={styles.container}>
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
