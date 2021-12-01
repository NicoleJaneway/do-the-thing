import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { RadioButton } from "react-native-paper";

export default function Details({ navigation }) {
  const [sessionLength, setSessionLength] = useState(25);
  const [task, setTask] = useState("");

  return (
    <>
      <View style={styles.container}>
        <Text>Set task</Text>
        <TextInput
          onChangeText={setTask}
          value={task}
          style={{ width: 200, textAlign: "center" }}
        />
        <Text>Set pomodoro</Text>
        <RadioButton
          value="25"
          status={sessionLength === 25 ? "checked" : "unchecked"}
          onPress={() => setSessionLength(25)}
        >
          <Text>25 minutes</Text>
        </RadioButton>
        <RadioButton
          value="32"
          status={sessionLength === 32 ? "checked" : "unchecked"}
          onPress={() => setSessionLength(32)}
        >
          32 minutes
        </RadioButton>
        <RadioButton
          value="50"
          status={sessionLength === 50 ? "checked" : "unchecked"}
          onPress={() => setSessionLength(50)}
        >
          50 minutes
        </RadioButton>
        <Button title="Start" onPress={navigation.navigate("clock")}>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
});
