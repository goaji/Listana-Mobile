import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../constants/colors";

const ListDetailsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>List Details Screen</Text>
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

export default ListDetailsScreen;
