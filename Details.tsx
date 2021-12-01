import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SetTimer from './SetTimer';
import TimerDisplay from './TimerDisplay'

export default function Details() {
    const [sessionLength, setSessionLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [task, setTask] = useState("");

    return (<>
        <View style={styles.container}>
            <Text>
                Set task
            </Text>
                <TextInput
                    onChangeText={setTask}
                    value={task}
                    style = {{ width: 20, textAlign: 'center' }}
                />
            <Text>
                Set pomodoro
            </Text>    
        </View>
     </>
    );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
    },
  });