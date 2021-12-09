import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  display: {
    textAlign: "center",
    alignItems: "center",
  },
});

export default function TimerDisplay({ displayTime, task }) {
  return (
    <>
      <View style={styles.display}>
        <Text>{task !== "" ? task : "&nbsp;"}</Text>
        <Text>time left</Text>
        <Text style={{ fontSize: 100 }}>{displayTime}</Text>
      </View>
    </>
  );
}
