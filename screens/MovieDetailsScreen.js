import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieDetailsScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Movie Details Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: Colors.fifthColor,
  },
});

export default MovieDetailsScreen;