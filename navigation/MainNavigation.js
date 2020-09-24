import React from "react";
import { Text } from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/colors";
import MaterialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/AccountScreen";
import ListDetailsScreen from "../screens/ListDetailsScreen";
import ListsScreen from "../screens/ListsScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import SearchScreen from "../screens/SearchScreen";
import MyMoviesScreen from "../screens/MyMoviesScreen";

const MainTab = createBottomTabNavigator();
const List = createStackNavigator();

const ListStack = (props) => {
  return (
    <List.Navigator
      initialRouteName="MyLists"
      backBehavior="none"
      headerMode="false"
    >
      <List.Screen name="MyLists" component={ListsScreen} />
      <List.Screen name="ListDetails" component={ListDetailsScreen} />
    </List.Navigator>
  );
};

const MainNavigator = (props) => {
  return (
    <NavigationContainer independent={true}>
      <MainTab.Navigator
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
        <MainTab.Screen
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
        <MainTab.Screen
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
        <MainTab.Screen
          name="MyLists"
          component={ListStack}
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
        <MainTab.Screen
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

        <MainTab.Screen
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
      </MainTab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
