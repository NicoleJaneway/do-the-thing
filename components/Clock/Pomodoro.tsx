import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import Clock from "./Clock";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function Pomodoro({ task, sessionLength }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>do the thing</Text>
      <Clock task={task} sessionLength={sessionLength} />
    </View>
  );
}
