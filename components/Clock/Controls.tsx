import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useHistory } from "react-router-native";
import { Entypo } from "@expo/vector-icons";

import runTimer from "../../utils/runTimer";
import { unloadSound } from "../../utils/sound";

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    padding: 10,
  },
  element: {
    padding: 10,
  },
});

export default function Controls({ countdownTime, setCountdownTime, sound }) {
  const [active, setActive] = useState(true);
  const history = useHistory();

  // Timer
  useEffect(() => {
    runTimer(countdownTime, setCountdownTime, active);
  }, [countdownTime, active]);

  const handleToggleClick = () => {
    setActive(!active);
  };

  const goBack = () => {
    unloadSound(sound);
    history.push("/");
  };

  const goForward = () => {
    unloadSound(sound);
    history.push("/finish");
  };

  return (
    <>
      <View style={styles.controls}>
        <Entypo
          name="controller-jump-to-start"
          size={24}
          color="black"
          style={styles.element}
          onPress={goBack}
        />
        <Text onPress={handleToggleClick} style={styles.element}>
          {active ? (
            <Entypo name="controller-paus" size={24} color="black" />
          ) : (
            <Entypo name="controller-play" size={24} color="black" />
          )}
        </Text>
        <Entypo
          name="controller-next"
          size={24}
          color="black"
          style={styles.element}
          onPress={goForward}
        />
      </View>
    </>
  );
}
