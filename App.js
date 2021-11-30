import React from "react";
import type { Node } from "react";
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
} from "react-native";

import { Button } from "react-native-paper";

import Root from "./Root";
import { AppContextProvider } from "./src/context/AppContext";

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <AppContextProvider>
        <Root />
      </AppContextProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
  },
});

export default App;
