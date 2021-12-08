import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Clock from "./Clock";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {},
});

const Pomodoro = ({ task, sessionLength }) => {
  return <Clock task={task} sessionLength={sessionLength} />;
};

export default Pomodoro;
