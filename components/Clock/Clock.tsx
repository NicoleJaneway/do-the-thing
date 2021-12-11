import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useHistory } from "react-router-native";
import { Audio } from "expo-av";

import TimerDisplay from "./TimerDisplay";
import Controls from "./Controls";
import Popup from "./Popup";
import theme from "../../theme";
import EnvContext from "../../EnvContext";

import { prodSettings, testSettings } from "../../utils/settings";
import convert from "../../utils/convert";
import { loadSound, playSound, unloadSound } from "../../utils/sound";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
});

export default function Clock({
  task,
  sessionLength,
  logs,
  setLogs,
  zenMode,
  mute,
  sessionCount,
  setSessionCount,
}) {
  const environment = useContext(EnvContext);
  const settings = environment === "prod" ? prodSettings : testSettings;

  const initialTime = sessionLength * settings.numberOfSeconds * 1000;
  const [countdownTime, setCountdownTime] = useState(initialTime);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [displayTime, setDisplayTime] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [sound, setSound] = useState<Audio.Sound>();

  const history = useHistory();

  useEffect(() => {
    loadSound(setSound);
  }, []);

  useEffect(() => {
    setDisplayTime(convert(countdownTime));
    setElapsedTime(initialTime - countdownTime);

    // display popup and play beep
    if (!zenMode && elapsedTime > 0 && elapsedTime % settings.checkin === 0) {
      setModalVisible(true);
      console.log("Mute: " + mute);
      if (!mute) {
        playSound(sound);
        console.log("within function, sound played");
      }
    }

    // play beep when time is up
    if (countdownTime === 0) {
      setSessionCount(sessionCount + 1);

      if (!mute) {
        playSound(sound);
      }
      unloadSound(sound);
      console.log("Time's up");
      history.push("/finish");
    }
  }, [countdownTime]);

  return (
    <>
      <View style={styles.container}>
        <TimerDisplay displayTime={displayTime} task={task} />
        <Controls
          countdownTime={countdownTime}
          setCountdownTime={setCountdownTime}
          sound={sound}
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
