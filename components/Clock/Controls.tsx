// @ts-nocheck

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  Vibration,
  Alert,
  AppState,
} from "react-native";
import { useHistory } from "react-router-native";
import { Entypo } from "@expo/vector-icons";
import { Notifications } from "expo";
// import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import differenceInMilliseconds from "date-fns/differenceInMilliseconds";

import { runTimer } from "../../utils/utils";
import { unloadSound } from "../../utils/sound";

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    padding: 10,
  },
  element: {
    padding: 10,
  },
});

export default function Controls({ countdownTime, setCountdownTime, sound }) {
  const [active, setActive] = useState(true);
  const [exitTime, setExitTime] = useState<Date>(null);
  const history = useHistory();
  const appState = useRef(AppState.currentState);

  // timer
  // useEffect(() => {
  //   runTimer(countdownTime, setCountdownTime, active, appState);
  //   console.log(appState.current);
  // }, [countdownTime, active, appState.current]);

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setCountdownTime((countdownTime) => countdownTime - 1000);
      }, 1000);
    } else if (active && countdownTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active, countdownTime]);

  // variable that is set when the app is backgrounded and read when opened in the foreground

  // timer update after background logic
  useEffect(() => {
    AppState.addEventListener("change", handleChange20);
    return () => {
      AppState.removeEventListener("change", handleChange20);
    };
  }, [countdownTime, active]);

  const handleChange20 = (newState) => {
    if (newState === "active" && active == true) {
      let resumeTime: Date = new Date();
      console.log("Exit time 2: ", exitTime);
      console.log("Resume time: ", resumeTime);
      let duration = differenceInMilliseconds(resumeTime, exitTime);
      console.log("Duration: ", differenceInMilliseconds(resumeTime, exitTime));
      if (countdownTime - duration >= 0) {
        setCountdownTime((countdownTime) => countdownTime - duration);
        console.log("New milliseconds: ", countdownTime - duration);
      }
    } else if (appState.current === "active" && newState === "background") {
      setExitTime(new Date());
      console.log("Exit time 1: ", new Date());
    }
  };

  const showToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  // //Notification Handling
  // const scheduleNotification = () => {
  //   Notifications.scheduleLocalNotificationAsync(
  //     {
  //       title: "Time's up!",
  //       body: "Your session has finished!",
  //       android: {
  //         channelId: "alert",
  //         icon: "../assets/notification.png",
  //         color: "#00B0FF",
  //         sticky: true,
  //       },
  //     },
  //     {
  //       time: new Date().getTime() + timer.seconds * 1000,
  //     }
  //   );
  // };

  // const askNotification = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //   if (Constants.isDevice && status === "granted")
  //     if (Platform.OS === "android") {
  //       Notifications.createChannelAndroidAsync("alert", {
  //         name: "Timer Alert",
  //         description: "Triggers when the timer has ended",
  //         sound: true,
  //         priority: "max",
  //         vibrate: true,
  //       });
  //     }
  // };

  // // notifications
  // useEffect(() => {
  //   askNotification();
  //   const listener = Notifications.addListener(handleNotification);
  //   return () => listener.remove();
  // }, []);

  // const handleNotification = (notification) => {
  //   if (notification.origin == "received") {
  //     Vibration.vibrate([500, 2000, 500, 2000, 500, 2000]);
  //     Alert.alert(
  //       "Timer finished",
  //       "Your session has been completed!",
  //       [
  //         {
  //           text: "OK",
  //           onPress: () => {
  //             Vibration.cancel();
  //             Notifications.dismissAllNotificationsAsync();
  //           },
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   } else if (notification.origin == "selected") {
  //     ToastAndroid.showWithGravity(
  //       "Session finished",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.CENTER
  //     );
  //     Notifications.dismissAllNotificationsAsync();
  //     Vibration.cancel();
  //   }
  // };

  // controls
  const handleToggleClick = () => {
    setActive(!active);
  };

  const goBack = () => {
    if (sound) {
      unloadSound(sound);
    }
    history.push("/");
  };

  const goForward = () => {
    if (sound) {
      unloadSound(sound);
    }
    history.push("/finish");
  };

  return (
    <>
      <View style={styles.controls}>
        <Entypo
          name="controller-jump-to-start"
          size={24}
          color="black"
          style={styles.element}
          onPress={goBack}
        />
        <Text onPress={handleToggleClick} style={styles.element}>
          {active ? (
            <Entypo name="controller-paus" size={24} color="black" />
          ) : (
            <Entypo name="controller-play" size={24} color="black" />
          )}
        </Text>
        <Entypo
          name="controller-next"
          size={24}
          color="black"
          style={styles.element}
          onPress={goForward}
        />
      </View>
    </>
  );
}
