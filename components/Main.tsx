import React, { useState } from "react";

import { Route, Switch, Redirect } from "react-router-native";

import Pomodoro from "./Clock/Pomodoro";
import Start from "./Start";
import Finish from "./Finish";

const Main = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [task, setTask] = useState("");
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Start
            task={task}
            setTask={setTask}
            sessionLength={sessionLength}
            setSessionLength={setSessionLength}
          />
        </Route>
        <Route exact path="/clock">
          <Pomodoro task={task} sessionLength={sessionLength} />
        </Route>
        <Route exact path="/finish">
          <Finish task={task} sessionLength={sessionLength} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default Main;
