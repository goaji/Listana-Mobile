import React from "react";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/colors";
import MaterialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Dimensions } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/AccountScreen";
import ListDetailsScreen from "../screens/ListDetailsScreen";
import ListsScreen from "../screens/ListsScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoriteMoviesScreen from "../screens/FavoriteMoviesScreen";

const { width, height } = Dimensions.get("window");

const MainTab = createBottomTabNavigator();
const Home = createStackNavigator();
const Favorites = createStackNavigator();
const List = createStackNavigator();
const Search = createStackNavigator();

const HomeStack = (props) => {
  return (
    <Home.Navigator
      initialRouteName="Home"
      backBehavior="none"
      headerMode="false"
    >
      <Home.Screen name="Home" component={HomeScreen} />
      <Home.Screen name="MovieDetails" component={MovieDetailsScreen} />
    </Home.Navigator>
  );
};
const FavoritesStack = (props) => {
  return (
    <Favorites.Navigator
      initialRouteName="MyMovies"
      backBehavior="none"
      headerMode="false"
    >
      <Favorites.Screen
        name="FavoriteMovies"
        component={FavoriteMoviesScreen}
      />
      <Favorites.Screen name="MovieDetails" component={MovieDetailsScreen} />
    </Favorites.Navigator>
  );
};
const ListStack = (props) => {
  return (
    <List.Navigator
      initialRouteName="MyLists"
      backBehavior="none"
      headerMode="false"
    >
      <List.Screen name="MyLists" component={ListsScreen} />
      <List.Screen name="ListDetails" component={ListDetailsScreen} />
      <List.Screen name="MovieDetails" component={MovieDetailsScreen} />
    </List.Navigator>
  );
};
const SearchStack = (props) => {
  return (
    <Search.Navigator
      initialRouteName="Search"
      backBehavior="none"
      headerMode="false"
    >
      <Search.Screen name="Search" component={SearchScreen} />
      <Search.Screen name="MovieDetails" component={MovieDetailsScreen} />
    </Search.Navigator>
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
            //this should be refined for different screen dimensions
            height: height / 11,
            alignContent: "center",
            padding: 10,
            backgroundColor: Colors.secondColor,
            position: "absolute",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            // to get rid of the white line
            borderTopWidth: 0,
          },
        }}
      >
        <MainTab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialComunityIcons
                name="home"
                color={focused ? Colors.firstColor : Colors.sixthColor}
                size={focused ? 40 : 30}
              />
            ),
          }}
        />
        <MainTab.Screen
          name="MyMovies"
          component={FavoritesStack}
          options={{
            tabBarLabel: "My Movies",
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialComunityIcons
                name="heart"
                color={focused ? Colors.firstColor : Colors.sixthColor}
                size={focused ? 40 : 30}
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
                color={focused ? Colors.firstColor : Colors.sixthColor}
                size={focused ? 40 : 30}
              />
            ),
          }}
        />
        <MainTab.Screen
          name="Search"
          component={SearchStack}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialComunityIcons
                name="feature-search"
                color={focused ? Colors.firstColor : Colors.sixthColor}
                size={focused ? 40 : 30}
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
                color={focused ? Colors.firstColor : Colors.sixthColor}
                size={focused ? 40 : 30}
              />
            ),
          }}
        />
      </MainTab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
