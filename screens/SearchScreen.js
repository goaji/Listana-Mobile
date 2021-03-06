import React, { useState, useEffect } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as movieActions from "../store/actions/movieActions";
import * as authActions from "../store/actions/authActions";
import Colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const SearchScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
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

  useEffect(() => {
    if ((searchValue != searchTerm) & (searchTerm != ""))
      setButtonPressed(false);
  }, [searchValue]);

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
                  setSearchTerm(searchValue);
                  await dispatch(movieActions.searchMovie(searchValue));
                  //   it's important to have buttonPressed after geting the results
                  //  to avoid seeing "No results" message until we fetch the results
                  setButtonPressed(true);
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
        {/* we use this logic to determine if there was a search and the user modified the search input */}
        {/* if so, we hide the results until the next time search button is pressed */}
        {searchValue == searchTerm && buttonPressed && (
          // this is for the cases when we don't have results
          <View style={styles.contentContainer}>
            {searchResults == "" &&
              buttonPressed(
                <View>
                  <Text>There are no movies that matched your query.</Text>
                </View>
              )}
            {/* //this is the container when there are results */}
            {searchResults != "" && (
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 10,
                    color: Colors.sixthColor,
                    textAlign: "center",
                  }}
                >
                  Search results for {searchTerm}
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
                        {/* find a solution for the movies without poster */}
                        <ImageBackground
                          defaultSource={require("../assets/images/poster3.jpg")}
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
                                    await dispatch(
                                      movieActions.resetMovieCast()
                                    );
                                    await dispatch(
                                      movieActions.movieCast(item.id)
                                    );
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
            )}
          </View>
        )}
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
  flatlistContainer: { flex: 1 },
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "center",
    flex: 2,
    paddingTop: 10,
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
});

export default SearchScreen;
