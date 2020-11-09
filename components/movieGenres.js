import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/colors";

const MovieGenres = (props) => {
  return (
    <View style={styles.genresContainer}>
      {props.genres.map((item) => (
        <View>
          <Text>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  genresContainer: {
    flexDirection: "row",
  },
});

export default MovieGenres;
