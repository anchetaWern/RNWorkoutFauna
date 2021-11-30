import * as React from "react";
import { AppRegistry } from "react-native";

import { DefaultTheme } from "@react-navigation/native";

import { Provider as PaperProvider } from "react-native-paper";
import App from "./App";
import { name as appName } from "./app.json";

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    text: "#333",
    background: "#ccc",
    gray: "#858585",
    white: "#fff",
    default: "#f2f2f2",
  },
  fonts: {
    ...DefaultTheme.fonts,
    small: 15,
    regular: 16,
    big: 20,
    icon: 30,
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
