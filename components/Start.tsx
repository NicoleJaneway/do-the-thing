import React, { useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Switch } from "react-native";
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
    marginTop: 4,
    padding: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.primary,
    width: "100%",
    textAlign: "left",
  },
  pomodoroSelector: {
    width: "100%",
    justifyContent: "flex-start",
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
    position: "absolute",
    alignSelf: "center",
    bottom: 80,
  },
});

export default function Start({
  task,
  setTask,
  sessionLength,
  setSessionLength,
  setLogs,
  zenMode,
  setZenMode,
}) {
  useEffect(() => {
    setTask("");
    setLogs([]);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            padding: 20,
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 16, textAlign: "left" }}>Set task:</Text>
          <TextInput
            onChangeText={setTask}
            value={task}
            style={styles.textInput}
          />
        </View>
        <View
          style={{
            marginBottom: 25,
            padding: 20,
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 16, marginBottom: 10 }}>Set pomodoro:</Text>
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
        <View
          style={{
            padding: 20,
            width: "100%",
          }}
        >
          <View>
            <Text style={{ fontSize: 16, textAlign: "left", marginBottom: 4 }}>
              Zen mode:
            </Text>
            <View style={styles.pomodoroSelector}>
              <Text style={{ paddingRight: 8 }}>No</Text>
              <Switch
                trackColor={{ false: "#767577", true: theme.colors.primary }}
                value={zenMode}
                onValueChange={() => setZenMode(!zenMode)}
                style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
              />
              <Text style={{ paddingLeft: 8 }}>Yes</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 16, textAlign: "left", marginBottom: 4 }}>
            Zen mode:
          </Text>
          <View style={styles.pomodoroSelector}>
            <Text style={{ paddingRight: 8 }}>No</Text>
            <Switch
              trackColor={{ false: "#767577", true: theme.colors.primary }}
              value={zenMode}
              onValueChange={() => setZenMode(!zenMode)}
              style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
            />
            <Text style={{ paddingLeft: 8 }}>Yes</Text>
          </View>
        </View>
      </View>
      <Link to="/clock">
        <Text style={styles.pressable}>Start</Text>
      </Link>
    </>
  );
}
