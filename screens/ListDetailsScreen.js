import React, { useState, useEffect } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import MaterialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as movieActions from "../store/actions/movieActions";
import * as authActions from "../store/actions/authActions";
import Colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ListDetailsScreen = (props) => {
  //even if we get the content of the list through props, we need to load them from state
  //so when we edit the list we get the updated data
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loggedInUser = useSelector((state) => state.authReducer.loggedInUser);

  const [selectedMovie, setSelectedMovie] = useState("");

  const theMoviesFromList = useSelector((state) =>
    state.authReducer.ourUserDatabase.customLists[props.route.params.item.id]
      .movies == undefined
      ? {}
      : state.authReducer.ourUserDatabase.customLists[
          props.route.params.item.id
        ].movies
  );

  const moviesFromList = [];

  Object.keys(theMoviesFromList).forEach((key) =>
    moviesFromList.push({ id: key, data: theMoviesFromList[key] })
  );

  const emptyList = moviesFromList.length == 0 ? true : false;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        imageStyle={{ resizeMode: "stretch" }}
        source={require("../assets/images/background1.png")}
        style={styles.imageBackground}
      >
        <View style={styles.headerContainer}>
          <View
            style={{
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => navigation.navigate("MyLists")}
            >
              <MaterialComunityIcons
                name="arrow-left-circle"
                color={Colors.fifthColor}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.titleText}>
              {props.route.params.item.data.listName}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
        {emptyList && (
          <View style={styles.emptyListContainer}>
            <Text>Your list is empty</Text>
          </View>
        )}
        {!emptyList && (
          <View style={styles.contentContainer}>
            <FlatList
              style={styles.flatListContainer}
              numColumns={3}
              data={moviesFromList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      selectedMovie != item.data.itemId
                        ? setSelectedMovie(item.data.itemId)
                        : setSelectedMovie("");
                    }}
                    style={styles.posterContainer}
                  >
                    <ImageBackground
                      source={{
                        uri: `http://image.tmdb.org/t/p/original/${item.data.posterPath}`,
                      }}
                      style={styles.posterImage}
                    >
                      {selectedMovie == item.data.itemId && (
                        <View
                          style={{
                            backgroundColor: "rgba(22, 29, 45, 0.65)",
                            paddingVertical: 10,
                            borderWidth: 2,
                            width: "100%",
                            aspectRatio: 1 / 1.5,
                            borderRadius: 10,
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            <TouchableOpacity
                              onPress={async () => {
                                await dispatch(
                                  movieActions.removeMovieFromList(
                                    loggedInUser,
                                    props.route.params.item.id,
                                    item.id
                                  )
                                );
                                await dispatch(
                                  authActions.userDbInit(loggedInUser)
                                );
                              }}
                            >
                              <MaterialComunityIcons
                                size={40}
                                color={"orangered"}
                                name={"delete"}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <TouchableOpacity
                              onPress={async () => {
                                await dispatch(movieActions.resetMovieCast());
                                await dispatch(
                                  movieActions.movieCast(item.data.itemId)
                                );
                                await dispatch(
                                  movieActions.getMovieDetails(item.data.itemId)
                                );
                                navigation.navigate("MovieDetails", {
                                  movieDetails: item.data,
                                  source: "list",
                                });
                                setSelectedMovie("");
                              }}
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: "80%",
                                height: 25,
                                backgroundColor: Colors.fifthColor,
                                borderWidth: 1,
                                borderColor: Colors.secondColor,
                                borderRadius: 14,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: Colors.sixthColor,
                                }}
                              >
                                Details
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </ImageBackground>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
        <View style={styles.underMenu}></View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  posterContainer: {
    overflow: "hidden",
    borderRadius: 10,
    width: width * 0.3,
    aspectRatio: 1 / 1.5,
    alignItems: "center",
    marginRight: (width - 20) / 40,
    marginBottom: (width - 20) / 40,
  },
  flatListContainer: {},
  movieContainer: {},
  posterImage: {
    overflow: "hidden",
    borderRadius: 10,
    aspectRatio: 1 / 1.5,
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.sixthColor,
    resizeMode: "contain",
  },
  titleText: {
    fontFamily: "roboto-bold",
    fontSize: 20,
    color: Colors.sixthColor,
    letterSpacing: 1,
  },
  headerContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 10,
    flex: 2,
  },
  emptyListContainer: {
    padding: 10,
    justifyContent: "center",
    flex: 9,
  },
  contentContainer: {
    padding: 10,

    flex: 9,
  },
  underMenu: {
    //looks like this doesn't work, check latter why. LE: we don't need it because of the FlatList
    // height: height > 700 ? 60 : 50,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: Colors.fifthColor,
  },
});

export default ListDetailsScreen;
