import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../store/actions/authActions";

import Colors from "../constants/colors";
import Genres from "../constants/movieGenresIds";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MovieGenres from "../components/movieGenres";

const { width, height } = Dimensions.get("window");

const MovieDetailsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const movieCast = useSelector((state) => state.movieReducer.movieCast);
  console.log("Castul", movieCast);

  const [isFavorite, setIsFavorite] = useState(false);

  const isFavoriteHandler = () => {
    setIsFavorite(!isFavorite);
    console.log("Favorit", isFavorite);
  };
  // this function fetches the launching dates and certifications in different states
  // we don't usem them in this version
  // async function getMovieDetails() {
  //   try {
  //     const response1 = await fetch(
  //       `https://api.themoviedb.org/3/movie/${route.params.movieDetails.id}/release_dates?api_key=929232d9b0b2af7e953d17654808d31f`
  //     );
  //     const responseJson1 = await response1.json();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.posterContainer}>
        <Image
          style={styles.posterImage}
          source={{
            uri: `http://image.tmdb.org/t/p/w1280/${route.params.movieDetails.backdrop_path}`,
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonsContainer2}>
            <View style={styles.icons}>
              <MaterialComunityIcons
                size={25}
                name="star"
                color={Colors.seventhColor}
              />
              <Text style={styles.iconText}>
                {route.params.movieDetails.vote_average}/10
              </Text>
            </View>
            <View style={styles.icons}>
              <TouchableOpacity
                onPress={isFavoriteHandler}
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
              <MaterialComunityIcons
                size={25}
                name="plus-circle-outline"
                color={Colors.sixthColor}
              />
              <Text style={styles.iconText}>Add</Text>
            </View>
          </View>
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
              {route.params.movieDetails.original_title}
            </Text>
          </View>
          <View style={styles.movieGenres}>
            {/* <MovieGenres genres={route.params.movieDetails.genre_ids} /> */}
            <FlatList
              alwaysBounceHorizontal={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.genreList}
              data={route.params.movieDetails.genre_ids}
              keyExtractor={(item) => item.toString()}
              // pay atention to this: item with {}, otherwise it does not work
              renderItem={({ item }) => {
                return (
                  <View style={styles.movieGenreContainer}>
                    <Text style={styles.movieGenreText}>{Genres[item]}</Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.movieStats}>
            <Text style={styles.movieStatsText}>
              {parseInt(route.params.movieDetails.release_date)}
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
                {route.params.movieDetails.overview}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "red",
  },
  buttonsContainer2: {
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
    borderBottomLeftRadius: 25,
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
    borderWidth: 1,
    borderColor: Colors.thirdColor,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",

    backgroundColor: Colors.firstColor,
  },
});

export default MovieDetailsScreen;
