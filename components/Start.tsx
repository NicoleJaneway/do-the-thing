import React, { useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import { useHistory } from "react-router-native";
import { RadioButton, Checkbox } from "react-native-paper";
import Constants from "expo-constants";

import theme from "../theme";

const viewableArea =
  Dimensions.get("window").height - Constants.statusBarHeight - 120;

const styles = StyleSheet.create({
  bigContainer: {
    top: Constants.statusBarHeight + 40,
    height: viewableArea,
    justifyContent: "center",
  },
  littleContainer: {
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
    zIndex: 100,
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
  mute,
  setMute,
  loop,
  setLoop,
  setSessionCount,
}) {
  const history = useHistory();

  useEffect(() => {
    setTask("");
    setLogs([]);
    setSessionCount(0);
  }, []);

  const handleStart = () => {
    history.push("/clock");
  };

  return (
    <>
      <View style={styles.bigContainer}>
        <Text style={{ textAlign: "center" }}>built 1915</Text>
        <View style={styles.littleContainer}>
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
              padding: 20,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 16, marginBottom: 10 }}>
              Set pomodoro:
            </Text>
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
              <Text
                style={{ fontSize: 16, textAlign: "left", marginBottom: 4 }}
              >
                Other settings:
              </Text>
              <View style={styles.pomodoroSelector}>
                <Checkbox
                  status={loop === true ? "checked" : "unchecked"}
                  onPress={() => setLoop(!loop)}
                />
                <Text>Loop</Text>
              </View>
              <View style={styles.pomodoroSelector}>
                <Checkbox
                  status={mute === true ? "checked" : "unchecked"}
                  onPress={() => setMute(!mute)}
                />
                <Text>Mute</Text>
              </View>
              <View style={styles.pomodoroSelector}>
                <Checkbox
                  status={zenMode === true ? "checked" : "unchecked"}
                  onPress={() => setZenMode(!zenMode)}
                />
                <Text>Zen</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.pressable} onPress={handleStart}>
        Start
      </Text>
    </>
  );
}
