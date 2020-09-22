import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../constants/colors";

const ListsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>List Screen</Text>
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

export default ListsScreen;
