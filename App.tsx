import React from "react";
import { NativeRouter, Route, Switch, Redirect } from "react-router-native";

import Main from "./components/Main";

export default function App() {
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
}
