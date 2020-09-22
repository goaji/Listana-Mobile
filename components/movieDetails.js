import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/colors";

const { width, height } = Dimensions.get("window");

const MovieDetails = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.movieTitle}>Emperor's new groove</Text>
      <Image
        style={styles.moviePoster}
        source={require("../assets/images/poster.jpg")}
      />
      <View style={styles.yearAndRatingContainer}>
        <Text style={styles.yearContainer}>
          <Text style={styles.yearTitle}>Year: </Text>
          <Text style={styles.year}>2000</Text>
        </Text>
        <Text style={styles.ratingContainer}>
          <Text style={styles.yearTitle}>Rating: </Text>
          <Text>8.7</Text>
        </Text>
      </View>
      <View>
        <Text style={styles.actorsContainer}>
          <Text style={styles.yearTitle}>With: </Text>
          <Text>David Spade, John Goodman, Eartha Kitt, Patrick Warburton</Text>
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          //   onPress={() => props.buttonsContainerVisibility("register")}
        >
          <Text style={styles.buttonText}>Add to a List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.hidePoster(false)}
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonText: {
    color: Colors.fifthColor,
  },
  yearTitle: {
    fontFamily: "roboto-bold",
  },
  actorsContainer: {
    padding: 20,
  },
  yearContainer: {},
  ratingContainer: {},
  container: {
    width: width * 0.85,
    height: 570,
    padding: 25,
    backgroundColor: Colors.fourthColor,
    borderWidth: 10,
    borderStyle: "dotted",
    justifyContent: "center",
  },
  movieTitle: {
    fontFamily: "roboto-bold",
    textAlign: "center",
    fontSize: 20,
    color: Colors.secondColor,
    paddingBottom: 20,
    textTransform: "uppercase",
  },
  moviePoster: {
    height: 300,
    resizeMode: "contain",
    alignSelf: "center",
    borderRadius: 0.2,
    padding: 5,
  },
  yearAndRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 20,
  },
  button: {
    color: "black",
    backgroundColor: Colors.secondColor,
    height: 40,
    width: 100,
    marginHorizontal: 80,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MovieDetails;
