import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TimerDisplay({ countdownTime, task }) {
  const convert = (ms) => {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor(ms / (1000 * 60));

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  };

  return (
    <>
      <View style={{ textAlign: "center" }}>
        <Text>{task !== "" ? task + " - " : null}time left</Text>
        <Text>{convert(countdownTime)}</Text>
      </View>
    </>
  );
}
