import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Link } from "react-router-native";
import { Audio } from "expo-av";
import { Entypo } from "@expo/vector-icons";

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    padding: 10,
  },
  element: {
    padding: 10,
  },
});

const playSound = async () => {
  await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

  const { sound: playbackObject } = await Audio.Sound.createAsync(
    {
      uri: "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Gongs%20and%20Super%20Crashes/1237[kb]kong-gong-long.wav.mp3",
    },
    { shouldPlay: true }
  );
};

export default function Controls({ countdownTime, setCountdownTime }) {
  const [active, setActive] = useState(true);

  // Timer
  useEffect(() => {
    let timer = 0;
    if (active && countdownTime >= 1000) {
      timer = setTimeout(() => setCountdownTime((prev) => prev - 1000), 1000);
    }
    return () => clearTimeout(timer);

    if (countdownTime === 0) {
      playSound();
    }
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
