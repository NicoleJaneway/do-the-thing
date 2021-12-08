import React, { useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { RadioButton } from "react-native-paper";
import { Link } from "react-router-native";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  textInput: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.primary,
    width: 200,
    textAlign: "center",
  },
  pomodoroSelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressable: {
    height: 30,
    width: 100,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    textAlign: "center",
    padding: 6,
    color: "white",
  },
});

export default function Start({
  task,
  setTask,
  sessionLength,
  setSessionLength,
  setLogs,
}) {
  useEffect(() => {
    setTask("");
    setLogs([]);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontSize: 20, marginBottom: 16 }}>do the thing</Text>
        <View
          style={{
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>Set task</Text>
          <TextInput
            onChangeText={setTask}
            value={task}
            style={styles.textInput}
          />
        </View>
        <View
          style={{
            marginBottom: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 16, marginBottom: 10 }}>Set pomodoro</Text>
          <View style={styles.pomodoroSelector}>
            <RadioButton
              value="25"
              status={sessionLength === 25 ? "checked" : "unchecked"}
              onPress={() => setSessionLength(25)}
            />
            <Text>25 minutes</Text>
          </View>
          <View style={styles.pomodoroSelector}>
            <RadioButton
              value="32"
              status={sessionLength === 32 ? "checked" : "unchecked"}
              onPress={() => setSessionLength(32)}
            />
            <Text>32 minutes</Text>
          </View>
          <View style={styles.pomodoroSelector}>
            <RadioButton
              value="50"
              status={sessionLength === 50 ? "checked" : "unchecked"}
              onPress={() => setSessionLength(50)}
            />
            <Text>50 minutes</Text>
          </View>
        </View>
        <Link to="/clock">
          <Text style={styles.pressable}>Start</Text>
        </Link>
      </View>
    </>
  );
}
