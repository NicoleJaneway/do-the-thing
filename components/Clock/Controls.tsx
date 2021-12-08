import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Link } from "react-router-native";
import { Audio } from "expo-av";

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
    let timer = 0;
    if (active && countdownTime >= 1000) {
      timer = setTimeout(() => setCountdownTime((prev) => prev - 1000), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdownTime, active]);

  const handleToggleClick = () => {
    setActive(!active);
  };

  const playSound = async () => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

    const { sound: playbackObject } = await Audio.Sound.createAsync(
      {
        uri: "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Gongs%20and%20Super%20Crashes/1237[kb]kong-gong-long.wav.mp3",
      },
      { shouldPlay: true }
    );
  };

  return (
    <>
      <View style={styles.controls}>
        <Link to="/">
          <Text style={styles.element}>⏮</Text>
        </Link>
        <Text onPress={handleToggleClick} style={styles.element}>
          {active ? "⏸" : "▶️"}
        </Text>
        <Link to="/finish">
          <Text style={styles.element}>⏭</Text>
        </Link>
      </View>
    </>
  );
}
