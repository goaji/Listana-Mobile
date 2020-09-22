import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../constants/colors";

const MyMoviesScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>My Movies Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: Colors.fifthColor,
  },
});

export default MyMoviesScreen;
