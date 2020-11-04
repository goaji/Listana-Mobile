//contains the whole app navigator

import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "../screens/SigninScreen";
import MainNavigator from "../navigation/MainNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

const MyStack = createStackNavigator();

const AppStartNavigator = (props) => {
  return (
    <SafeAreaProvider style={styles.safeArea}>
      <NavigationContainer>
        <MyStack.Navigator
          initialRouteName="SignInScreen"
          backBehavior="none"
          screenOptions={{ headerShown: false }}
        >
          <MyStack.Screen
            backBehavior="none"
            name="SigninScreen"
            component={SigninScreen}
          />
          <MyStack.Screen
            backBehavior="none"
            name="MainScreen"
            component={MainNavigator}
          />
        </MyStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppStartNavigator;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
