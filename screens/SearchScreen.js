import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import Colors from "../constants/colors";
import MovieDetails from "../components/movieDetails";
import { SafeAreaView } from "react-native-safe-area-context";
import * as listsAction from "../store/actions/listsAction";
import SearchResults from "../components/searchResults";
import { useSelector, useDispatch } from "react-redux";

const SearchScreen = (props) => {
  const [moviePosterVisibility, moviePosterVisibilityHandler] = useState(false);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [searchButtonPressed, setSearchButtonPressed] = useState(false);

  const searchTMDB = async (searchValue) => {
    const query = searchValue;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=929232d9b0b2af7e953d17654808d31f&language=en-US&query=${query}&include_adult=false`;
    try {
      const results = await fetch(url);
      const newSearchResults = await results.json();
      //this results is important, we have our results in an array of objects
      const moviesResults = [...newSearchResults.results];
      dispatch(listsAction.saveSearchResults(moviesResults));
    } catch (err) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="search movie"
          value={searchValue}
          onChangeText={(value) => setSearchValue(value)}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setSearchButtonPressed(true);
          searchTMDB(searchValue);
        }}
      >
        <Text style={styles.textButton}>Search</Text>
      </TouchableOpacity>
      <View style={styles.searchResults}>
        {searchButtonPressed && <SearchResults></SearchResults>}
      </View>
    </SafeAreaView>
  );
  //   <SafeAreaView style={styles.container}>
  // {/* API 929232d9b0b2af7e953d17654808d31f */}
  // {/* <TouchableOpacity
  //   onPress={() => {
  //     const namel = "A noua lista";
  //     const movie = ["999000", "989898", "998899"];
  //     const owner = "03";
  //     dispatch(listsAction.addList(namel, movie, owner));
  //   }}
  // >
  //   <Text>AddProduct</Text>
  // </TouchableOpacity>
  // <TouchableOpacity
  //   style={styles.button}
  //   onPress={() => moviePosterVisibilityHandler(true)}
  // >
  //   <Text style={styles.buttonText}>Show</Text>
  // </TouchableOpacity>
  // <Modal
  //   style={styles.modalContainer}
  //   transparent={true}
  //   visible={moviePosterVisibility}
  // >
  //   <View>
  //     <MovieDetails hidePoster={moviePosterVisibilityHandler} />
  //   </View>
  // </Modal> */}
  // </SafeAreaView>
};

const styles = StyleSheet.create({
  searchResults: {
    height: "90%",
  },
  modalContainer: {
    height: 800,
    margin: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.fifthColor,
    padding: 10,
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
    padding: 5,
    marginBottom: 20,
  },
  searchContainer: {
    width: "100%",
    alignItems: "center",
    height: 50,
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "blue",
    height: 30,
    width: 100,
    justifyContent: "center",
    borderRadius: 10,
  },
  textButton: {
    color: Colors.fifthColor,
    alignSelf: "center",
  },
});

export default SearchScreen;
