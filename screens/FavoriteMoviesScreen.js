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

const FavoriteMoviesScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loggedInUser = useSelector((state) => state.authReducer.loggedInUser);

  const [selectedMovie, setSelectedMovie] = useState("");

  const theFavoritesList = useSelector((state) =>
    state.authReducer.ourUserDatabase.myLists.myMovies.movies == undefined
      ? {}
      : state.authReducer.ourUserDatabase.myLists.myMovies.movies
  );

  const favoritesList = [];

  Object.keys(theFavoritesList).forEach((key) =>
    favoritesList.push({ id: key, data: theFavoritesList[key] })
  );

  const emptyFavoriteList = favoritesList.length == 0 ? true : false;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        imageStyle={{ resizeMode: "stretch" }}
        source={require("../assets/images/background1.png")}
        style={styles.imageBackground}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Your favorite movies</Text>
        </View>
        {emptyFavoriteList && (
          <View style={styles.emptyListContainer}>
            <Text>Your list is empty</Text>
          </View>
        )}
        <View style={styles.contentContainer}>
          <FlatList
            // columnWrapperStyle={{ justifyContent: "" }}
            style={styles.flatListContainer}
            numColumns={3}
            data={favoritesList}
            keyExtractor={(item) => item.id.toString()}
            // pay atention to this: item with {}, otherwise it does not work
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
                    {/* <Image
                    style={styles.posterImage}
                    source={{
                      uri: `http://image.tmdb.org/t/p/original/${item.data.posterPath}`,
                    }}
                  /> */}
                    {/* <Modal visible={selectedMovie == item.data.itemId}> */}
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
                                movieActions.handleFavoritesList(
                                  item.id,
                                  "remove",
                                  loggedInUser
                                )
                              );
                              await dispatch(
                                authActions.userDbInit(loggedInUser)
                              );
                            }}
                          >
                            <MaterialComunityIcons
                              size={40}
                              color={"red"}
                              name={"heart"}
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
                                source: "fav",
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
                              style={{ fontSize: 15, color: Colors.sixthColor }}
                            >
                              Details
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    {/* // </Modal> */}
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
          />
        </View>
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
    paddingHorizontal: 10,
    justifyContent: "center",
    // alignItems: "center",
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

export default FavoriteMoviesScreen;
