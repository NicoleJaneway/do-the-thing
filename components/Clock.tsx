import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import SetTimer from "./SetTimer";
import TimerDisplay from "./TimerDisplay";

export default function Clock({ task, sessionLength }) {
  const [breakLength, setBreakLength] = useState(5);
  const [countdownTime, setCountdownTime] = useState(sessionLength * 60 * 1000);
  const [active, setActive] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [sessionCounter, setSessionCounter] = useState(0);
  const completedSessionCounter = Math.ceil(sessionCounter / 2);

  const audioRef = useRef();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 4,
    },
  });

  let initialTime = sessionLength * 60 * 1000;

  useEffect(() => {
    setCountdownTime(initialTime);
  }, [sessionLength, breakLength]);

  if (countdownTime === 0) {
    setCountdownTime((isSession ? breakLength : sessionLength) * 60 * 1000);
    setSessionCounter((prev) => prev + 1);
    setIsSession(!isSession);
  }

  return (
    <>
      <View style={styles.container}>
        <TimerDisplay countdownTime={countdownTime} task={task} />
      </View>
    </>
  );
}
