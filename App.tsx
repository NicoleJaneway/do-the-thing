import React from "react";
import { NativeRouter, Route, Switch, Redirect } from "react-router-native";

import Pomodoro from "./components/Pomodoro";
import Details from "./components/Details";

export default function App() {
  return (
    <NativeRouter>
      <Switch>
        <Route exact path="/">
          <Details />
        </Route>
        <Route exact path="/clock">
          <Pomodoro />
        </Route>
        <Redirect to="/" />
      </Switch>
    </NativeRouter>
  );
}
