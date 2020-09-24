import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import Colors from "../constants/colors";
import MovieDetails from "../components/movieDetails";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = (props) => {
  const [moviePosterVisibility, moviePosterVisibilityHandler] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => moviePosterVisibilityHandler(true)}
      >
        <Text style={styles.buttonText}>Show</Text>
      </TouchableOpacity>
      <Modal
        style={styles.modalContainer}
        transparent={true}
        visible={moviePosterVisibility}
      >
        <View>
          <MovieDetails hidePoster={moviePosterVisibilityHandler} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: 800,
    margin: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: Colors.fifthColor,
  },
});

export default SearchScreen;
