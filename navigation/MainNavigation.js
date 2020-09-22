import React from "react";
import { Text } from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/colors";
import MaterialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/AccountScreen";
import ListDetailsScreen from "../screens/ListDetailsScreen";
import ListsScreen from "../screens/ListsScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import SearchScreen from "../screens/SearchScreen";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import MyMoviesScreen from "../screens/MyMoviesScreen";

const MainStack = createBottomTabNavigator();

const MainNavigator = (props) => {
  return (
    <NavigationContainer independent={true}>
      <MainStack.Navigator
        initialRouteName="Home"
        backBehavior="none"
        tabBarOptions={{
          showLabel: false,
          //   activeTintColor: Colors.fourthColor,
          inactiveTintColor: Colors.fifthColor,
          style: {
            flex: 0.07,
            alignContent: "center",
            // padding: 10,
            backgroundColor: Colors.firstColor,
          },
        }}
      >
        <MainStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialComunityIcons
                name="home"
                color={focused ? Colors.fourthColor : Colors.fifthColor}
                size={focused ? 50 : 30}
              />
            ),
          }}
        />
        <MainStack.Screen
          name="MyMovies"
          component={MyMoviesScreen}
          options={{
            tabBarLabel: "My Movies",
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialComunityIcons
                name="video"
                color={focused ? Colors.fourthColor : Colors.fifthColor}
                size={focused ? 50 : 30}
              />
            ),
          }}
        />
        <MainStack.Screen
          name="MyLists"
          component={ListsScreen}
          options={{
            tabBarLabel: "Lists",
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialComunityIcons
                name="view-list"
                color={focused ? Colors.fourthColor : Colors.fifthColor}
                size={focused ? 50 : 30}
              />
            ),
          }}
        />
        <MainStack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialComunityIcons
                name="feature-search"
                color={focused ? Colors.fourthColor : Colors.fifthColor}
                size={focused ? 50 : 30}
              />
            ),
          }}
        />

        <MainStack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialComunityIcons
                name="account-box"
                color={focused ? Colors.fourthColor : Colors.fifthColor}
                size={focused ? 50 : 30}
              />
            ),
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
