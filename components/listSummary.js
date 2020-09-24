import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const onPressFunction = (listId) => console.log(listId);

const ListSummary = (props) => {
  //we use this one to pass navigation as a prop to the component
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.listSummaryContainer}
        onPress={() => {
          // now we have the navigator and we send to the next screen the listId we've clicked
          navigation.navigate("ListDetails", { itemId: props.listId });
        }}
      >
        <View style={styles.posterContainer}>
          <Image
            style={styles.moviePoster}
            source={require("../assets/images/poster2.jpg")}
          />
        </View>
        <View style={styles.listDetailsContainer}>
          <Text style={styles.listTitle} numberOfLines={2}>
            {props.listTitle}
          </Text>
          <Text>Number of movies in this list: {props.numberOfMovies}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity>
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
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
    // paddingHorizontal: 10,
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
    padding: 20,
    backgroundColor: Colors.fifthColor,
  },
});

export default ListSummary;
