import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  display: {
    textAlign: "center",
    alignItems: "center",
  },
});

export default function TimerDisplay({ displayTime, task }) {
  return (
    <>
      <View style={styles.display}>
        <Text style={{ marginBottom: 10, fontSize: 18 }}>
          {task !== "" ? task : "\u00A0"}
        </Text>
        <Text style={{ fontStyle: "italic" }}>time left</Text>
        <Text style={{ fontSize: 100 }}>{displayTime}</Text>
      </View>
    </>
  );
}
