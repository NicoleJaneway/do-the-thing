import React, { useEffect, useState, useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link, useHistory } from "react-router-native";
import Constants from "expo-constants";
import { Entypo } from "@expo/vector-icons";

import EnvContext from "../EnvContext";

import { prodSettings, testSettings } from "../utils/settings";
import theme from "../theme";
import convert from "../utils/convert";
import runTimer from "../utils/runTimer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
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

const Finish = ({ task, sessionLength, logs, loop, sessionCount }) => {
  let breakLength = 5;

  if (sessionLength === 32) {
    breakLength = 8;
  } else if (sessionLength === 50) {
    breakLength = 10;
  }

  const environment = useContext(EnvContext);
  const settings = environment === "prod" ? prodSettings : testSettings;

  const initialTime = breakLength * settings.numberOfSeconds * 1000;

  const [countdownTime, setCountdownTime] = useState(initialTime);
  const [displayTime, setDisplayTime] = useState("");
  const [active, setActive] = useState(true);

  const history = useHistory();

  const handleToggleClick = () => {
    setActive(!active);
  };

  const recase = (str: string) => {
    return str[0].toLowerCase() + str.substring(1);
  };

  useEffect(() => {
    setDisplayTime(convert(countdownTime));
  });

  useEffect(() => {
    // Timer
    runTimer(countdownTime, setCountdownTime, active);

    // loop
    if (loop && countdownTime === 0) {
      history.push("/clock");
    }
  }, [countdownTime, active]);

  return (
    <>
      <View
        style={{
          alignItems: "center",
          marginBottom: 20,
          position: "absolute",
          right: 20,
          top: Constants.statusBarHeight + 40,
          zIndex: 100,
        }}
      >
        <Text style={{ fontStyle: "italic" }}>break</Text>
        <Text
          style={{
            fontSize: 24,
            color: theme.colors.textSecondary,
          }}
        >
          {displayTime}
        </Text>
        {countdownTime > 0 ? (
          active ? (
            <Pressable onPress={handleToggleClick}>
              <Entypo
                name="controller-paus"
                size={24}
                color="grey"
                style={{ opacity: 0.5 }}
              />
            </Pressable>
          ) : (
            <Pressable onPress={handleToggleClick}>
              <Entypo
                name="controller-play"
                size={24}
                color="grey"
                style={{ opacity: 0.5 }}
              />
            </Pressable>
          )
        ) : (
          <Pressable onPress={() => setCountdownTime(initialTime)}>
            <Entypo
              name="cycle"
              size={24}
              color="grey"
              style={{ opacity: 0.5 }}
            />
          </Pressable>
        )}
      </View>
      <View style={styles.container}>
        <View style={{ marginBottom: 40, alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>
            Good job{task === "" ? "!" : " working on " + recase(task)}
          </Text>
          {sessionCount > 0 && (
            <Text style={{ marginBottom: 8, fontStyle: "italic" }}>
              Sessions completed: {sessionCount}
            </Text>
          )}
        </View>
        {logs.length > 0 && (
          <Text style={{ fontSize: 18, marginBottom: 8 }}>Your summary:</Text>
        )}
        <View
          style={{
            width: "100%",
            textAlign: "left",
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 20,
          }}
        >
          {logs.map((log: string) => (
            <Text
              style={{ fontSize: 16, marginTop: 4, marginBottom: 4 }}
              key={logs.indexOf(log) + 1}
            >
              Checkin #{logs.indexOf(log) + 1} - {log}
            </Text>
          ))}
        </View>
      </View>
      <Link to="/">
        <Text style={styles.pressable}>Restart</Text>
      </Link>
    </>
  );
};

export default Finish;
