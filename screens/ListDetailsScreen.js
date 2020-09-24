import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const ListDetailsScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{props.route.params.itemId}</Text>
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

export default ListDetailsScreen;
