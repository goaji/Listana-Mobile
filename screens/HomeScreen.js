import React, { useState } from "react";
import { View, StyleSheet, Text, Modal } from "react-native";
import Colors from "../constants/colors";
import MovieDetails from "../components/movieDetails";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = (props) => {
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
      {/* <Modal visible={false}>
        <MovieDetails hidePoster={moviePosterVisibilityHandler} />
      </Modal> */}
      <Text>{activeUser.userId}</Text>
      <Text>{activeUserLists.length}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.fifthColor,
  },
});

export default HomeScreen;
