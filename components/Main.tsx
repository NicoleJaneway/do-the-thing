import React, { useState } from "react";

import { Route, Switch, Redirect } from "react-router-native";

import Clock from "./Clock/Clock";
import Start from "./Start";
import Finish from "./Finish";

const Main = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [task, setTask] = useState("");
  const [logs, setLogs] = useState([]);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Start
            task={task}
            setTask={setTask}
            sessionLength={sessionLength}
            setSessionLength={setSessionLength}
            setLogs={setLogs}
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
    </>
  );
};

export default Main;
