import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/colors";
import MovieDetails from "../components/movieDetails";
import { SafeAreaView } from "react-native-safe-area-context";
import * as listsAction from "../store/actions/listsAction";

const SearchScreen = (props) => {
  const [moviePosterVisibility, moviePosterVisibilityHandler] = useState(false);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          const namel = "A noua lista";
          const movie = ["999000", "989898", "998899"];
          const owner = "03";
          dispatch(listsAction.addList(namel, movie, owner));
        }}
      >
        <Text>AddProduct</Text>
      </TouchableOpacity>
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
    alignItems: "center",
    backgroundColor: Colors.fifthColor,
  },
});

export default SearchScreen;
