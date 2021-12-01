import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Clock from "./Clock"

export default function Pomodoro() {
    return (
    <View style={styles.container}>
    <Text style={{fontSize: 20}}>do the thing</Text>
        <Clock />
    <StatusBar style="auto" />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#7fd1c7',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  