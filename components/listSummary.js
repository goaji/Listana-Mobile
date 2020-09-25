import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as listsAction from "../store/actions/listsAction";

const ListSummary = (props) => {
  const [isPressed, isPressedHandler] = useState(false);
  const dispatch = useDispatch();
  //checking if isPressed has remained true for this list but the active id is different
  //that can cause a bug and not showing the buttons right;
  isPressed && !(props.isClicked === props.listId)
    ? isPressedHandler(false)
    : "";
  //we use this one to pass navigation as a prop to the component
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          isPressed && props.isClicked === props.listId
            ? styles.listSummaryContainerPressed
            : styles.listSummaryContainer
        }
        onPress={() => {
          isPressedHandler(!isPressed);
          if (props.isClicked === props.listId) {
            props.isClickedHandler(null);
            isPressedHandler(false);
          } else {
            props.isClickedHandler(props.listId);
          }
        }}
      >
        <View style={styles.posterContainer}>
          <Image
            style={styles.moviePoster}
            source={require("../assets/images/poster2.jpg")}
          />
        </View>
        <View style={styles.secondColumn}>
          <View style={styles.listDetailsContainer}>
            <Text style={styles.listTitle} numberOfLines={2}>
              {props.listTitle}
            </Text>
            <Text>Number of movies in this list: {props.numberOfMovies}</Text>
          </View>
          {isPressed && props.isClicked === props.listId && (
            <View style={styles.buttonsContainerPressed}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  //resetting the handlers so when we come back to this screen from details, we start from scratch
                  isPressedHandler(false);
                  props.isClickedHandler(null);
                  navigation.navigate("ListDetails", { itemId: props.listId });
                }}
              >
                <Text style={styles.textButtons}>Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: Colors.thirdColor }}
              >
                <Text
                  style={styles.textButtons}
                  onPress={() => {
                    dispatch(listsAction.removeList(props.listId));
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  secondColumn: {
    flex: 4,
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  listTitle: {
    fontFamily: "roboto-bold",
    fontSize: 25,
    paddingBottom: 1,
  },

  moviePoster: {
    flex: 1,
    height: 100,
    resizeMode: "contain",
  },
  listSummaryContainer: {
    flexDirection: "row",
    height: 100,
    // paddingHorizontal: 10,
  },
  listSummaryContainerPressed: {
    flexDirection: "row",
    height: 150,
  },
  posterContainer: {
    flex: 1.1,
    flexDirection: "column",
    borderWidth: 1,
    alignItems: "center",
    height: 100,
  },
  listDetailsContainer: {
    height: 100,
    padding: 5,
    justifyContent: "space-between",
  },

  buttonsContainerPressed: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.secondColor,
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  textButtons: {
    color: Colors.fifthColor,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: Colors.fifthColor,
  },
});

export default ListSummary;
