import React, { Component, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import AppStartNavigator from "./navigation/AppStartNavigation";
import { Clipboard } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import myReducers from "./store/reducers/listsReducer";
import authReducer from "./store/reducers/authReducers";

const rootReducer = combineReducers({
  mainReducer: myReducers,
  authReducer: authReducer,
});

const myStore = createStore(rootReducer, applyMiddleware(ReduxThunk));

// HACK: Prevent "Expo pasted from CoreSimulator" notification from spamming continuously
if (__DEV__) {
  Clipboard.setString("");
}

const fetchFonts = () => {
  return Font.loadAsync({
    "roboto-thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "roboto-light": require("./assets/fonts/Roboto-Light.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "roboto-black": require("./assets/fonts/Roboto-Black.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  //waiting for the fonts to load
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  //this Provider is needed for redux
  return (
    <Provider store={myStore}>
      <AppStartNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
