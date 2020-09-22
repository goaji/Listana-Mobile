//contains the whole app navigator

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "../screens/SigninScreen";
import MainNavigator from "../navigation/MainNavigation";

const MyStack = createStackNavigator();

const AppStartNavigator = (props) => {
  return (
    <NavigationContainer>
      <MyStack.Navigator
        initialRouteName="SignIn=Screen"
        backBehavior="none"
        screenOptions={{ headerShown: false }}
      >
        <MyStack.Screen name="SigninScreen" component={SigninScreen} />
        <MyStack.Screen name="MainScreen" component={MainNavigator} />
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default AppStartNavigator;
