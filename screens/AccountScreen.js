import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import Colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const numberOfMovies = 5;

const AccountScreen = (props) => {
  return (
    <SafeAreaView>
      <Text>Account screen</Text>
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

export default AccountScreen;
