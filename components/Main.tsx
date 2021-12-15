import React, { useState } from "react";
import { Text } from "react-native";
import { Route, Switch, Redirect } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import Clock from "./Clock/Clock";
import Start from "./Start";
import Finish from "./Finish";
import EnvContext from "../EnvContext";

const Main = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [task, setTask] = useState("");
  const [logs, setLogs] = useState([]);
  const [loop, setLoop] = useState(false);
  const [mute, setMute] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

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
        do-the-thing
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
            loop={loop}
            setLoop={setLoop}
            setSessionCount={setSessionCount}
          />
        </Route>
        <EnvContext.Provider value="prod">
          <Route exact path="/clock">
            <Clock
              task={task}
              sessionLength={sessionLength}
              logs={logs}
              setLogs={setLogs}
              zenMode={zenMode}
              mute={mute}
              sessionCount={sessionCount}
              setSessionCount={setSessionCount}
            />
          </Route>
          <Route exact path="/finish">
            <Finish
              task={task}
              sessionLength={sessionLength}
              logs={logs}
              loop={loop}
              sessionCount={sessionCount}
            />
          </Route>
        </EnvContext.Provider>
        <Redirect to="/" />
      </Switch>
      {/* <StatusBar style="light" /> */}
    </>
  );
};

export default Main;
