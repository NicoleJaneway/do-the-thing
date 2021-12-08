import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { Link } from "react-router-native";

import theme from "../theme";

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
  },
});

const Finish = ({ task, sessionLength, logs }) => {
  let breakLength = 5;

  if (sessionLength === 32) {
    breakLength = 8;
  } else if (sessionLength === 50) {
    breakLength = 10;
  }

  useEffect(() => {
    console.log("From Finish: " + logs);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>do the thing</Text>
      <Text style={{ marginBottom: 20 }}>
        Good job{task === "" ? "!" : " working on " + task}
      </Text>
      {logs.length > 0 && <Text>Your summary:</Text>}
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
          <Text key={logs.indexOf(log) + 1}>
            Checkin #{logs.indexOf(log) + 1} - {log}
          </Text>
        ))}
      </View>
      <Link to="/">
        <Text style={styles.pressable}>Restart</Text>
      </Link>
    </View>
  );
};

export default Finish;
