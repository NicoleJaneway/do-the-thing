import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
});

const Finish = ({ task, sessionLength }) => {
  let breakLength = 5;

  if (sessionLength === 32) {
    breakLength = 8;
  } else if (sessionLength === 50) {
    breakLength = 10;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>do the thing</Text>
      <Text>Good job{task === "" ? "!" : " working on " + task}</Text>
      <Text>Your summary:</Text>
    </View>
  );
};

export default Finish;
