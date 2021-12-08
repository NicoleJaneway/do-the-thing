import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import TimerDisplay from "./TimerDisplay";
import Controls from "./Controls";
import Popup from "./Popup";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
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
          <TimerDisplay displayTime={displayTime} task={task} />
          <Controls
            countdownTime={countdownTime}
            setCountdownTime={setCountdownTime}
          />
          <Popup
            task={task}
            displayTime={displayTime}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      </>
    );
}
