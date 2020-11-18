import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../store/actions/authActions";
import * as movieActions from "../store/actions/movieActions";

import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const HomeScreen = (props) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.authReducer.loggedInUser);
  const isFirstTime = useSelector(
    (state) => state.authReducer.ourUserDatabase.firstTimeLogin
  );
  const firstName = useSelector(
    (state) => state.authReducer.ourUserDatabase.firstName
  );
  const lastName = useSelector(
    (state) => state.authReducer.ourUserDatabase.lastName
  );
  const recentlyLaunchedMovies = useSelector(
    (state) => state.authReducer.recentlyLaunched
  );
  const upcomingMovies = useSelector(
    (state) => state.authReducer.upcomingMovies
  );

  // convert the object to an array for the flatlist
  const favoritesList = useSelector((state) =>
    state.authReducer.ourUserDatabase.favoriteMovies.movies == undefined
      ? []
      : Object.values(state.authReducer.ourUserDatabase.favoriteMovies.movies)
  );

  const emptyFavoriteList = favoritesList.length == 0 ? true : false;

  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNamedValue, setLastNameValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  //finish-you-account popup state handling
  const completeRegistrationHandler = () => {
    dispatch(
      authActions.completeRegistration(
        firstNameValue,
        lastNamedValue,
        ageValue,
        loggedInUser
      )
    );
    dispatch(authActions.userDbInit(loggedInUser));
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        imageStyle={styles.imageBackgroundStyle}
        source={require("../assets/images/background1.png")}
        style={styles.imageBackground}
      >
        <View style={styles.homeScreenContainer}>
          {/* title section */}
          <View style={styles.container1}>
            {!isFirstTime && (
              <View>
                <Text style={styles.helloText}>
                  Hello, {firstName} {lastName}.
                </Text>
                <Text style={styles.helloText}>Welcome back!</Text>
              </View>
            )}
          </View>

          {/* recently launched section */}
          <View style={styles.container2}>
            <Text style={styles.titleText}>Recently launched</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.homePageList}
              data={recentlyLaunchedMovies}
              keyExtractor={(item) => item.id.toString()}
              // pay atention to this: item with {}, otherwise it does not work
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(movieActions.resetMovieCast());
                      dispatch(movieActions.movieCast(item.id));
                      navigation.navigate("MovieDetails", {
                        movieDetails: item,
                        source: "recent",
                      });
                    }}
                    style={styles.movieContainer}
                  >
                    <Image
                      style={styles.posterImage}
                      source={{
                        uri: `http://image.tmdb.org/t/p/original/${item.poster_path}`,
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {/* upcoming movies section */}
          <View style={styles.container3}>
            <Text style={styles.titleText}>Upcoming movies</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.homePageList}
              data={upcomingMovies}
              keyExtractor={(item) => item.id.toString()}
              // pay atention to this: item with {}, otherwise it does not work
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(movieActions.resetMovieCast());
                      dispatch(movieActions.movieCast(item.id));
                      navigation.navigate("MovieDetails", {
                        movieDetails: item,
                        source: "upcoming",
                      });
                    }}
                    style={styles.movieContainer}
                  >
                    <Image
                      style={styles.posterImage}
                      source={{
                        uri: `http://image.tmdb.org/t/p/w342/${item.poster_path}`,
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {/* last added section */}
          <View style={styles.container4}>
            <Text style={styles.titleText}>Last Added to Favorites</Text>
            {emptyFavoriteList && (
              <Text
                style={{
                  color: Colors.sixthColor,
                  fontSize: 13,
                  fontStyle: "italic",
                }}
              >
                You don't have any favorite movies yet.
              </Text>
            )}
            {!emptyFavoriteList && (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={styles.homePageList}
                data={favoritesList}
                keyExtractor={(item) => item.itemId.toString()}
                // pay atention to this: item with {}, otherwise it does not work
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={async () => {
                        await dispatch(movieActions.resetMovieCast());
                        await dispatch(movieActions.movieCast(item.itemId));
                        await dispatch(
                          movieActions.getMovieDetails(item.itemId)
                        );
                        navigation.navigate("MovieDetails", {
                          movieDetails: item,
                          source: "fav",
                        });
                      }}
                      style={styles.movieContainer}
                    >
                      <Image
                        style={styles.posterImage}
                        source={{
                          uri: `http://image.tmdb.org/t/p/w342/${item.posterPath}`,
                        }}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>

          {/* this space will be empty, under the bottom menu */}
          <View style={styles.underMenu}></View>
        </View>

        <Modal visible={isFirstTime} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalPopup}>
              <View style={styles.containerSet}>
                <Text style={styles.textTitle}>Please complete</Text>
                <Text style={styles.textTitle}>your registration</Text>
              </View>
              <View style={styles.containerSet}>
                <Text style={styles.textInputText}>First Name</Text>
                <TextInput
                  autoCapitalize="none"
                  value={firstNameValue}
                  onChangeText={(value) => setFirstNameValue(value)}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.containerSet}>
                <Text style={styles.textInputText}>Last Name</Text>
                <TextInput
                  autoCapitalize="none"
                  value={lastNamedValue}
                  onChangeText={(value) => setLastNameValue(value)}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.containerSet}>
                <Text style={styles.textInputText}>Age</Text>
                <TextInput
                  autoCapitalize="none"
                  value={ageValue}
                  onChangeText={(value) => setAgeValue(value)}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.containerSet}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={completeRegistrationHandler}
                >
                  <Text style={styles.textButton}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homePageList: {
    // borderWidth: 5,
    // borderColor: Colors.thirdColor,
  },

  posterImage: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.sixthColor,
    flex: 1,
    // this is one way to do it, if you don't know the width and height
    aspectRatio: 1 / 1.5,

    resizeMode: "contain",
    marginRight: 10,
  },
  titleText: {
    paddingBottom: 10,
    fontFamily: "roboto-medium",
    fontSize: 15,
    color: Colors.sixthColor,
    letterSpacing: 0.5,
  },
  helloText: {
    fontFamily: "roboto-bold",
    fontSize: 30,
    color: Colors.sixthColor,
    letterSpacing: 1,
  },
  underMenu: {
    height: height > 700 ? 60 : 50,
  },
  container1: {
    padding: 10,
    paddingLeft: 20,
    flex: 2,
    justifyContent: "center",
  },
  container2: {
    padding: 10,
    flex: 3,
  },
  container3: {
    padding: 10,
    flex: 3,
  },
  container4: {
    padding: 10,
    flex: 3,
  },
  homeScreenContainer: {
    flex: 1,
  },
  imageBackgroundStyle: {
    resizeMode: "stretch",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
  },
  containerSet: {
    paddingBottom: 10,
  },
  textButton: {
    textAlign: "center",
    color: Colors.sixthColor,
    fontSize: 20,
    fontFamily: "roboto-medium",
  },

  button: {
    alignItems: "center",
    backgroundColor: Colors.fourthColor,
    width: 125,
    height: 50,
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: Colors.thirdColor,
    marginHorizontal: 10,
  },
  textInputText: {
    color: Colors.sixthColor,
    textAlign: "center",
  },
  textTitle: {
    fontWeight: "500",
    textTransform: "uppercase",
    fontSize: 25,
    color: Colors.sixthColor,
    textAlign: "center",
  },
  textInput: {
    width: 270,
    height: 30,
    backgroundColor: Colors.sixthColor,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(22, 29, 45, 0.85)",
  },
  modalPopup: {
    alignSelf: "center",
    backgroundColor: Colors.thirdColor,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.8,
    height: height * 0.5,
    borderColor: Colors.fifthColor,
    borderWidth: 5,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.fifthColor,
  },
});

export default HomeScreen;
