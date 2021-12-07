import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import SetTimer from "./SetTimer";
import TimerDisplay from "./TimerDisplay";

export default function Clock() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [countdownTime, setCountdownTime] = useState(sessionLength * 60 * 1000);
  const [active, setActive] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [sessionCounter, setSessionCounter] = useState(0);
  const completedSessionCounter = Math.ceil(sessionCounter / 2);
  const [task, setTask] = useState("");

  const audioRef = useRef();

  let initialTime = (isSession ? sessionLength : breakLength) * 60 * 1000; // fix

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
        <SetTimer
          type="Session"
          length={sessionLength}
          setLength={setSessionLength}
        />
        <SetTimer
          type="Break"
          length={breakLength}
          setLength={setBreakLength}
        />
      </View>
      <TimerDisplay
        type={isSession ? "Session" : "Break"}
        countdownTime={countdownTime}
        task={task}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
});
