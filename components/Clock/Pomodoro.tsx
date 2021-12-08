import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Clock from "./Clock";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
});

const Pomodoro = ({ task, sessionLength }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>do the thing</Text>
      <Clock task={task} sessionLength={sessionLength} />
    </View>
  );
};

export default Pomodoro;
