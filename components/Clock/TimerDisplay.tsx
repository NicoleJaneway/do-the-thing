import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  display: {
    padding: 10,
    textAlign: "center",
  },
});

export default function TimerDisplay({ displayTime, task }) {
  return (
    <>
      <View style={styles.display}>
        <Text>{task !== "" ? task + " - " : null}time left</Text>
        <Text>{displayTime}</Text>
      </View>
    </>
  );
}
