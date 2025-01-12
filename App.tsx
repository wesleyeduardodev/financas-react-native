import {StatusBar} from "react-native";
import {Home} from "./src/screens/Home/Home";
import React from "react";

export default function App() {
  return (
      <>
        <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
        />
        <Home/>
      </>
  )
}