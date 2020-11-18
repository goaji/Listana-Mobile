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
  TextInput,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as movieActions from "../store/actions/movieActions";
import * as authActions from "../store/actions/authActions";
import Colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const SearchScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [searchValue, setSearchValue] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");

  const loggedInUser = useSelector((state) => state.authReducer.loggedInUser);

  const theFavoritesList = useSelector((state) =>
    state.authReducer.ourUserDatabase.favoriteMovies.movies == undefined
      ? {}
      : state.authReducer.ourUserDatabase.favoriteMovies.movies
  );
  const favoritesList = [];

  Object.keys(theFavoritesList).forEach((key) =>
    favoritesList.push({ id: key, data: theFavoritesList[key] })
  );

  async function favoriteHandler(key, posterPath) {
    const movieKey = isThisMovieFavorite(key);
    if (movieKey == undefined) {
      await dispatch(
        movieActions.handleFavoritesList(key, "add", loggedInUser, posterPath)
      );
      await dispatch(authActions.userDbInit(loggedInUser));
    } else {
      console.log("remove");
      await dispatch(
        movieActions.handleFavoritesList(movieKey, "remove", loggedInUser)
      );
      await dispatch(authActions.userDbInit(loggedInUser));
    }
  }

  const isThisMovieFavorite = (movieKey) => {
    var favoriteMovieKey = undefined;
    if (favoritesList == undefined) {
    } else {
      const favoritesListMovies = favoritesList;
      favoriteMovieKey = Object.keys(favoritesListMovies).find(
        (key) => favoritesListMovies[key].data.itemId === movieKey
      );
    }
    return favoriteMovieKey == undefined
      ? undefined
      : favoritesList[favoriteMovieKey].id;
  };
  const searchResults = useSelector(
    (state) => state.movieReducer.searchResults.results
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        imageStyle={{ resizeMode: "stretch" }}
        source={require("../assets/images/background1.png")}
        style={styles.imageBackground}
      >
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 1 }}></View>
            <View
              style={{
                flexDirection: "row",
                width: width * 0.6,
                alignItems: "flex-start",
                paddingTop: 20,
              }}
            >
              <TextInput
                autoCapitalize="none"
                placeholder={"search"}
                value={searchValue}
                onChangeText={(value) => setSearchValue(value)}
                style={styles.textInput}
              />
              <TouchableOpacity
                onPress={async () => {
                  await dispatch(movieActions.searchMovie(searchValue));
                }}
              >
                <MaterialIcons
                  size={25}
                  name="search"
                  color={Colors.sixthColor}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            ></View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={{
              fontSize: 18,
              marginBottom: 10,
              color: Colors.sixthColor,
              textAlign: "center",
            }}
          >
            Search results for {searchValue}
          </Text>
          <FlatList
            style={styles.flatListContainer}
            numColumns={3}
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    selectedMovie != item.id
                      ? setSelectedMovie(item.id)
                      : setSelectedMovie("");
                  }}
                  style={styles.posterContainer}
                >
                  <ImageBackground
                    source={{
                      uri: `http://image.tmdb.org/t/p/original/${item.poster_path}`,
                    }}
                    style={styles.posterImage}
                  >
                    {selectedMovie == item.id && (
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
                            onPress={() => {
                              favoriteHandler(item.id, item.poster_path);
                            }}
                          >
                            <MaterialComunityIcons
                              size={40}
                              color={"orangered"}
                              name={
                                isThisMovieFavorite(item.id) == undefined
                                  ? "heart-outline"
                                  : "heart"
                              }
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
                              await dispatch(movieActions.movieCast(item.id));
                              navigation.navigate("MovieDetails", {
                                movieDetails: item,
                                source: "search",
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
  posterImage: {
    overflow: "hidden",
    borderRadius: 10,
    aspectRatio: 1 / 1.5,
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.sixthColor,
    resizeMode: "contain",
  },
  textInput: {
    flex: 1,
    height: 25,
    backgroundColor: Colors.sixthColor,
    paddingHorizontal: 10,
  },
  listData: {
    padding: 10,
    justifyContent: "space-between",
  },
  listPosterImage: {
    height: "100%",
    aspectRatio: 1 / 1.5,
    borderWidth: 3,
    borderColor: Colors.fifthColor,
  },
  listContainer: {
    flexDirection: "row",
    width: "100%",
    height: 170,
    borderWidth: 5,
    borderColor: Colors.firstColor,
    backgroundColor: Colors.secondColor,
    marginBottom: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  flatlistContainer: { flex: 1 },
  titleText: {
    fontFamily: "roboto-bold",
    fontSize: 30,
    color: Colors.sixthColor,
    letterSpacing: 1,
  },
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "center",
    flex: 2,
    paddingTop: 10,
  },
  emptyListContainer: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    padding: 10,
    flex: 10,
  },
  underMenu: {},
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
  addListTitleText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: Colors.firstColor,
  },
  textButton: {
    textAlign: "center",
    color: Colors.sixthColor,
    fontSize: 17,
    fontFamily: "roboto-medium",
  },
  addListButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.fourthColor,
    width: width / 3,
    height: 50,
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: Colors.thirdColor,
    marginHorizontal: 10,
  },
  modalPopup: {
    paddingVertical: 20,
    height: 210,
    width: width * 0.9,
    borderWidth: 5,
    borderColor: Colors.firstColor,
    backgroundColor: Colors.fifthColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(22, 29, 45, 0.85)",
  },
});

export default SearchScreen;
