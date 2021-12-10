import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Link } from "react-router-native";
import { Entypo } from "@expo/vector-icons";

import runTimer from "../../utils/runTimer";

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    padding: 10,
  },
  element: {
    padding: 10,
  },
});

export default function Controls({ countdownTime, setCountdownTime }) {
  const [active, setActive] = useState(true);

  // Timer
  useEffect(() => {
    runTimer(countdownTime, setCountdownTime, active);
  }, [countdownTime, active]);

  const handleToggleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <View style={styles.controls}>
        <Link to="/">
          <Entypo
            name="controller-jump-to-start"
            size={24}
            color="black"
            style={styles.element}
          />
        </Link>
        <Text onPress={handleToggleClick} style={styles.element}>
          {active ? (
            <Entypo name="controller-paus" size={24} color="black" />
          ) : (
            <Entypo name="controller-play" size={24} color="black" />
          )}
        </Text>
        <Link to="/finish">
          <Entypo
            name="controller-next"
            size={24}
            color="black"
            style={styles.element}
          />
        </Link>
      </View>
    </>
  );
}
