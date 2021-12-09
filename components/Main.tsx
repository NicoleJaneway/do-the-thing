import React, { useState } from "react";
import { Text } from "react-native";
import { Route, Switch, Redirect } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import Clock from "./Clock/Clock";
import Start from "./Start";
import Finish from "./Finish";

const Main = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [task, setTask] = useState("");
  const [logs, setLogs] = useState([]);
  const [zenMode, setZenMode] = useState(false);
  const [mute, setMute] = useState(false);

  return (
    <>
      <Text
        style={{
          top: Constants.statusBarHeight + 10,
          fontSize: 20,
          marginBottom: 16,
          alignSelf: "center",
          backgroundColor: "transparent",
          position: "absolute",
          zIndex: 100,
        }}
      >
        do the thing
      </Text>
      <Switch>
        <Route exact path="/">
          <Start
            task={task}
            setTask={setTask}
            sessionLength={sessionLength}
            setSessionLength={setSessionLength}
            setLogs={setLogs}
            zenMode={zenMode}
            setZenMode={setZenMode}
            mute={mute}
            setMute={setMute}
          />
        </Route>
        <Route exact path="/clock">
          <Clock
            task={task}
            sessionLength={sessionLength}
            logs={logs}
            setLogs={setLogs}
          />
        </Route>
        <Route exact path="/finish">
          <Finish task={task} sessionLength={sessionLength} logs={logs} />
        </Route>
        <Redirect to="/" />
      </Switch>
      {/* <StatusBar style="light" /> */}
    </>
  );
};

export default Main;
