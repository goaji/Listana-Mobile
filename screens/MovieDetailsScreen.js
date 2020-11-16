import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as movieActions from "../store/actions/movieActions";
import * as authActions from "../store/actions/authActions";

import Colors from "../constants/colors";
import Genres from "../constants/movieGenresIds";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../constants/colors";

const { width, height } = Dimensions.get("window");

const MovieDetailsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const movieCast = useSelector((state) => state.movieReducer.movieCast);

  const loggedInUser = useSelector((state) => state.authReducer.loggedInUser);

  const [isAddListMode, setIsAddListMode] = useState(false);
  const [showAddListForm, setShowAddListForm] = useState(false);
  const [createNewList, setCreateNewList] = useState(true);
  const [listName, setListName] = useState("");
  const [selectedList, setSelectedList] = useState("");

  const favoritesList = useSelector(
    (state) => state.authReducer.ourUserDatabase.myLists
  );

  //we need this sequence to transform this object of objects to an array of objects that includes the key, too
  const theCustomLists = useSelector((state) =>
    state.authReducer.ourUserDatabase.customLists == undefined
      ? {}
      : state.authReducer.ourUserDatabase.customLists
  );

  const customLists = [];
  Object.keys(theCustomLists).forEach((key) =>
    customLists.push({ id: key, data: theCustomLists[key] })
  );
  // const navigationSource = route.params.source;

  const movieKey =
    route.params.source == "fav"
      ? route.params.movieDetails.itemId
      : route.params.movieDetails.id;

  const posterPath = useSelector(
    (state) => state.movieReducer.movieDetails.poster_path
  );
  const backdropPath = useSelector(
    (state) => state.movieReducer.movieDetails.backdrop_path
  );
  const voteAverage = useSelector(
    (state) => state.movieReducer.movieDetails.vote_average
  );
  const genresIds = useSelector(
    (state) => state.movieReducer.movieDetails.genres
  );
  const overview = useSelector(
    (state) => state.movieReducer.movieDetails.overview
  );
  const movieTitle = useSelector(
    (state) => state.movieReducer.movieDetails.original_title
  );
  const releaseDate = useSelector(
    (state) => state.movieReducer.movieDetails.release_date
  );

  var favoriteMovieKey = undefined;
  if (favoritesList.myMovies.movies == undefined) {
  } else {
    const favoritesListMovies = favoritesList.myMovies.movies;
    favoriteMovieKey = Object.keys(favoritesListMovies).find(
      (key) => favoritesListMovies[key].itemId === movieKey
    );
  }
  const [isFavorite, setIsFavorite] = useState(() =>
    favoriteMovieKey === undefined ? false : true
  );

  useEffect(() => {
    dispatch(authActions.userDbInit(loggedInUser));
  }, [isFavorite, dispatch]);

  async function isFavoriteHandler(movieId) {
    if (isFavorite) {
      await dispatch(
        movieActions.handleFavoritesList(
          favoriteMovieKey,
          "remove",
          loggedInUser
        )
      );
      setIsFavorite(false);
    } else {
      await dispatch(
        movieActions.handleFavoritesList(
          movieId,
          "add",
          loggedInUser,
          // this logic covers the particular case when user comes from the favorites list,
          // unfavs a movie and then favs it again, otherwise it won't write the poster path
          route.params.source == "fav"
            ? posterPath
            : route.params.movieDetails.poster_path
        )
      );
      setIsFavorite(true);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.posterContainer}>
        <Image
          style={styles.posterImage}
          source={{
            uri:
              route.params.source == "fav"
                ? `http://image.tmdb.org/t/p/w1280/${backdropPath}`
                : `http://image.tmdb.org/t/p/w1280/${route.params.movieDetails.backdrop_path}`,
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.buttonsContainer}>
          {!isAddListMode && (
            <View style={styles.buttonsContainer2}>
              <View style={styles.icons}>
                <MaterialComunityIcons
                  size={25}
                  name="star"
                  color={Colors.seventhColor}
                />
                <Text style={styles.iconText}>
                  {route.params.source == "fav"
                    ? voteAverage
                    : route.params.movieDetails.vote_average}
                  /10
                </Text>
              </View>
              <View style={styles.icons}>
                <TouchableOpacity
                  onPress={() => {
                    isFavoriteHandler(movieKey);
                  }}
                  style={styles.favoriteIconContainer}
                >
                  <MaterialComunityIcons
                    size={25}
                    color={"red"}
                    name={isFavorite ? "heart" : "heart-outline"}
                  />
                  <Text style={styles.iconText}>
                    {isFavorite ? "Unfavorite" : "Favorite"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.icons}>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={() => setIsAddListMode(true)}
                >
                  <MaterialComunityIcons
                    size={25}
                    name="plus-circle-outline"
                    color={Colors.sixthColor}
                  />
                  <Text style={styles.iconText}>Add to</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {isAddListMode && (
            <View style={styles.addListContainer}>
              <View style={styles.icons}>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={() => setIsAddListMode(false)}
                >
                  {/* <MaterialComunityIcons
                    size={25}
                    name="plus-circle-outline"
                    color={Colors.sixthColor}
                  /> */}
                  <Text style={styles.iconText}>Add to</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.addListHalfContainer}
                  onPress={() => {
                    setCreateNewList(false);
                    setShowAddListForm(true);
                  }}
                >
                  <MaterialComunityIcons
                    style={{ alignSelf: "center" }}
                    size={25}
                    name="clipboard-text-outline"
                    color={Colors.sixthColor}
                  />
                  <Text style={styles.iconText}>existing list</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.addListHalfContainer}
                onPress={() => {
                  setCreateNewList(true);
                  setShowAddListForm(true);
                }}
              >
                <MaterialComunityIcons
                  style={{ alignSelf: "center" }}
                  size={25}
                  name="clipboard-outline"
                  color={Colors.sixthColor}
                />
                <View>
                  <Text style={styles.iconText}>new list</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.movieTitle}>
            <Text
              style={{
                color: Colors.sixthColor,
                fontSize: 25,
                fontWeight: "700",
              }}
            >
              {route.params.source == "fav"
                ? movieTitle
                : route.params.movieDetails.original_title}
            </Text>
          </View>
          <View style={styles.movieGenres}>
            {/* <MovieGenres genres={route.params.movieDetails.genre_ids} /> */}
            <FlatList
              alwaysBounceHorizontal={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.genreList}
              data={
                route.params.source == "fav"
                  ? genresIds
                  : route.params.movieDetails.genre_ids
              }
              keyExtractor={
                route.params.source == "fav"
                  ? (item) => item.id.toString()
                  : (item) => item.toString()
              }
              // pay atention to this: item with {}, otherwise it does not work
              renderItem={({ item }) => {
                return (
                  <View style={styles.movieGenreContainer}>
                    <Text style={styles.movieGenreText}>
                      {route.params.source == "fav"
                        ? Genres[item.id]
                        : Genres[item]}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.movieStats}>
            <Text style={styles.movieStatsText}>
              {route.params.source == "fav"
                ? parseInt(releaseDate)
                : parseInt(route.params.movieDetails.release_date)}
            </Text>
            <Text style={styles.movieStatsText}></Text>
            <Text style={styles.movieStatsText}></Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.textSubtitle}>Plot Summary</Text>
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            style={styles.plotSummary}
          >
            <View style={styles.overviewContainer}>
              <Text style={styles.overviewText}>
                {route.params.source == "fav"
                  ? overview
                  : route.params.movieDetails.overview}
              </Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.actorsImagesContainer}>
          <View>
            <Text style={styles.textSubtitle}>Cast</Text>
            <FlatList
              alwaysBounceHorizontal={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.theMovieCast}
              data={movieCast}
              keyExtractor={(item) => item.cast_id.toString()}
              // pay atention to this: item with {}, otherwise it does not work
              renderItem={({ item }) => {
                return (
                  <View style={styles.movieCastContainer}>
                    <Image
                      defaultSource={require("../assets/images/poster2.jpg")}
                      style={styles.actorImage}
                      source={{
                        uri: `http://image.tmdb.org/t/p/w185/${item.profile_path}`,
                      }}
                    />
                    <View>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.movieCastText}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}></View>
      </View>

      {/* this is the popup for adding the movie to a list */}
      <Modal visible={showAddListForm} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalPopup}>
            {createNewList && (
              <View style={{ alignItems: "center" }}>
                <View>
                  <Text style={styles.addListTitleText}>
                    Name of the new list:
                  </Text>
                  <TextInput
                    autoCapitalize="none"
                    value={listName}
                    onChangeText={(value) => setListName(value)}
                    style={styles.textInput}
                  />
                </View>
                <View>
                  <View style={styles.addListButtonsContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={async () => {
                        await dispatch(
                          movieActions.createNewList(
                            loggedInUser,
                            listName,
                            movieKey,
                            route.params.source == "fav"
                              ? posterPath
                              : route.params.movieDetails.poster_path
                          )
                        );
                        await dispatch(authActions.userDbInit(loggedInUser));
                        setListName("");
                        setIsAddListMode(false);
                        setShowAddListForm(false);
                      }}
                    >
                      <Text style={styles.textButton}>Create&Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        setListName("");
                        setIsAddListMode(false);
                        setShowAddListForm(false);
                      }}
                    >
                      <Text style={styles.textButton}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setListName("");
                      setCreateNewList(false);
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 15,
                        color: Colors.sixthColor,
                      }}
                    >
                      Add to an existing list
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {!createNewList && (
              <View>
                {customLists == undefined && (
                  <View>
                    <Text style={styles.addListTitleText}>
                      You don't have any custom lists.
                    </Text>
                  </View>
                )}
                <View style={{ alignItems: "center" }}>
                  {customLists != undefined && (
                    <View>
                      <Text style={styles.addListTitleText}>Your lists:</Text>
                      <View
                        style={{
                          minHeight: height * 0.2,
                          maxHeight: height * 0.6,
                          // height:
                          //   customLists.length > 3
                          //     ? height * 0.6
                          //     : height * 0.3,
                        }}
                      >
                        <FlatList
                          style={styles.myCustomLists}
                          data={customLists}
                          keyExtractor={(item) => item.id.toString()}
                          // pay atention to this: item with {}, otherwise it does not work
                          renderItem={({ item }) => {
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  setSelectedList(item.id);
                                }}
                              >
                                <View
                                  style={{
                                    justifyContent: "center",
                                    borderWidth: 2,
                                    width: width * 0.8,
                                    height: 50,
                                    backgroundColor:
                                      selectedList == item.id
                                        ? Colors.firstColor
                                        : Colors.fifthColor,
                                    marginVertical: 5,
                                    paddingVertical: 3,
                                    paddingHorizontal: 5,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      fontWeight: "700",
                                      color: Colors.sixthColor,
                                    }}
                                  >
                                    {item.data.listName}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: Colors.sixthColor,
                                    }}
                                  >
                                    Movies already in this list:{" "}
                                    {Object.values(item.data.movies).length}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            );
                          }}
                        />
                      </View>
                    </View>
                  )}
                  <View style={styles.addListButtonsContainer}>
                    {selectedList != "" && (
                      <TouchableOpacity
                        onPress={async () => {
                          await dispatch(
                            movieActions.addMovieToList(
                              loggedInUser,
                              selectedList,
                              movieKey,
                              route.params.source == "fav"
                                ? posterPath
                                : route.params.movieDetails.poster_path
                            )
                          );
                          await dispatch(authActions.userDbInit(loggedInUser));
                          setSelectedList("");
                          setIsAddListMode(false);
                          setShowAddListForm(false);
                        }}
                        style={styles.button}
                      >
                        <Text style={styles.textButton}>Add</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        setSelectedList("");
                        setIsAddListMode(false);
                        setShowAddListForm(false);
                      }}
                    >
                      <Text style={styles.textButton}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <TouchableOpacity onPress={() => setCreateNewList(true)}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 15,
                        color: Colors.sixthColor,
                      }}
                    >
                      Create a new list
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  myCustomLists: { flexDirection: "row" },
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
  textInput: {
    width: 270,
    height: 30,
    backgroundColor: Colors.sixthColor,
    marginVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalPopup: {
    paddingVertical: 20,
    width: width * 0.9,
    borderWidth: 5,
    borderColor: Colors.firstColor,
    backgroundColor: Colors.fifthColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    // dont' forget to add some shaddow
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(22, 29, 45, 0.85)",
  },
  favoriteIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  movieCastContainer: {
    width: 50,
    marginRight: 10,
  },
  movieCastText: {
    fontSize: 8,
    color: Colors.sixthColor,
    textAlign: "center",
  },
  actorImage: {
    height: 75,
    aspectRatio: 1 / 1.5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.sixthColor,
    marginBottom: 2,
  },
  overviewText: {
    fontSize: 15,
    color: Colors.sixthColor,
  },
  overviewContainer: {
    flex: 1,
  },
  textSubtitle: {
    fontWeight: "500",
    fontSize: 20,
    color: Colors.sixthColor,
    marginBottom: 5,
  },
  movieStatsText: {
    fontSize: 10,
    color: Colors.sixthColor,
  },
  movieStats: {
    paddingHorizontal: 10,
  },
  movieGenreText: {
    fontSize: 12,
    alignSelf: "center",
    color: Colors.sixthColor,
  },
  movieGenreContainer: {
    height: 20,
    borderWidth: 2,
    borderColor: Colors.sixthColor,
    marginRight: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 8,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: Colors.fourthColor,
  },
  movieGenres: {
    paddingHorizontal: 10,
  },
  movieTitle: {
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  iconText: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.sixthColor,
  },
  icons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    height: 50,
    // backgroundColor: "red",
  },
  buttonsContainer2: {
    borderWidth: 2,
    borderColor: Colors.fifthColor,
    flexDirection: "row",
    alignSelf: "flex-end",
    height: 60,
    width: width * 0.6,
    color: "red",
    backgroundColor: Colors.thirdColor,
    marginTop: -30,
    marginBottom: 30,
    marginRight: -5,
    borderTopLeftRadius: 25,
    paddingRight: 5,
    borderBottomLeftRadius: 25,
  },
  addListContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    height: 60,
    width: width * 0.6,
    color: "red",
    backgroundColor: Colors.fifthColor,
    marginTop: -30,
    marginBottom: 30,
    marginRight: -5,
    paddingRight: 5,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  addListHalfContainer: {
    justifyContent: "center",
    flex: 1,
  },
  textContainer: { flex: 1 },
  titleContainer: {
    height: 85,
  },
  posterImage: {
    aspectRatio: 1.77,
    width: width * 1,
    // height: height / 2.2,
  },
  posterContainer: {
    // overflow: "hidden",
    // flex: 5,

    alignItems: "center",
  },
  buttonsContainer: {
    flex: 1,
  },
  detailsContainer: {
    flex: 4,

    padding: 10,
  },
  actorsImagesContainer: {
    height: 130,
    paddingLeft: 10,
  },
  bottomContainer: {
    alignSelf: "stretch",
    height: height / 11,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",

    backgroundColor: Colors.firstColor,
  },
});

export default MovieDetailsScreen;
