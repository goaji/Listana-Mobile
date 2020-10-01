import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Colors from "../constants/colors";
import { useSelector, useDispatch } from "react-redux";

const { width, height } = Dimensions.get("window");

const SearchResults = (props) => {
  const renderItem = (item) => {
    return <Text>test</Text>;
  };
  const dispatch = useDispatch();
  const theSearchResults = useSelector(
    (state) => state.mainReducer.searchResults
  );
  return (
    <View>
      <Text>Iaca Lista</Text>
      <FlatList
        style={styles.searchResults}
        data={theSearchResults}
        keyExtractor={(item) => item.id}
        // pay atention to this: item with {}, otherwise it does not work
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => {}} style={styles.movieContainer}>
              <Text>{item.title}</Text>
              <Text>{item.release_date}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  movieContainer: {
    height: 50,
  },
});

export default SearchResults;
