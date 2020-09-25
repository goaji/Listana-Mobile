import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as listsAction from "../store/actions/listsAction";

const ListDetailsScreen = (props) => {
  //loading all the lists
  const allLists = useSelector((state) => state.mainReducer.myLists);
  const dispatch = useDispatch();
  const clickedList = allLists.find(
    (list) => list.listId === props.route.params.itemId
  );
  var movieList = [];
  for (let i = 0; i < clickedList.movies.length; i++) {
    movieList.push(
      <TouchableOpacity
        key={i}
        onPress={() => {
          dispatch(listsAction.removeMovieFromList(i, clickedList.listId));
        }}
      >
        <Text>{clickedList.movies[i]}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>{clickedList.listId}</Text>
      <Text>{clickedList.listName}</Text>
      <View>{movieList}</View>
      <Text>{clickedList.ownerId}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.fifthColor,
  },
});

export default ListDetailsScreen;
