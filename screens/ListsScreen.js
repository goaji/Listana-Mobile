import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, Modal, Image } from "react-native";
import Colors from "../constants/colors";
import { useSelector } from "react-redux";

import ListSummary from "../components/listSummary";
import { SafeAreaView } from "react-native-safe-area-context";

const ListsScreen = (props) => {
  //movie popup state handling
  const [moviePosterVisibility, moviePosterVisibilityHandler] = useState(false);

  //getting the content of the Users Array and then finding the one is logged in
  const myUsers = useSelector((state) => state.mainReducer.users);
  const activeUser = myUsers.find((user) => user.userId === "03");
  //getting the content of the Lists array and the keeping only those that belong to the active user
  const allLists = useSelector((state) => state.mainReducer.myLists);
  const activeUserLists = allLists.filter(
    (list) => list.ownerId === activeUser.userId
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={activeUserLists}
        keyExtractor={(item) => item.listId}
        renderItem={(itemData) => (
          <ListSummary
            listTitle={itemData.item.listName}
            numberOfMovies={itemData.item.movies.length}
            listId={itemData.item.listId}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listTitle: {
    fontFamily: "roboto-bold",
    fontSize: 25,
    paddingBottom: 1,
  },

  moviePoster: {
    flex: 1,
    resizeMode: "contain",
  },
  listSummaryContainer: {
    flexDirection: "row",
    height: 100,
    paddingHorizontal: 10,
  },
  posterContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "center",
  },
  listDetailsContainer: {
    flex: 4,
    borderWidth: 1,
    padding: 5,
    justifyContent: "space-between",
  },
  buttonsContainer: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    // padding: 10,
    backgroundColor: Colors.fifthColor,
  },
});

export default ListsScreen;

{
  /* <Modal visible={false}>
      <MovieDetails hidePoster={moviePosterVisibilityHandler} />
    </Modal> */
}
