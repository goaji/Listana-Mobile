import React, { useState, useEffect } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import MaterialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as movieActions from "../store/actions/movieActions";
import * as authActions from "../store/actions/authActions";
import Colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ListsScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loggedInUser = useSelector((state) => state.authReducer.loggedInUser);

  const theCustomLists = useSelector((state) =>
    state.authReducer.ourUserDatabase.customLists == undefined
      ? {}
      : state.authReducer.ourUserDatabase.customLists
  );

  const customLists = [];

  Object.keys(theCustomLists).forEach((key) =>
    customLists.push({ id: key, data: theCustomLists[key] })
  );

  const emptyCustomLists = customLists.length == 0 ? true : false;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        imageStyle={{ resizeMode: "stretch" }}
        source={require("../assets/images/background1.png")}
        style={styles.imageBackground}
      >
        <View style={styles.headerContainer}>
          <View style={{ flex: 5, justifyContent: "flex-start" }}>
            <Text style={styles.titleText}>Your lists</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity>
              <MaterialComunityIcons
                size={30}
                name="playlist-plus"
                color={Colors.sixthColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentContainer}>
          {emptyCustomLists && (
            <View style={styles.emptyListContainer}>
              <Text>You don't have any list. </Text>
            </View>
          )}
          {!emptyCustomLists && (
            <View style={styles.flatlistContainer}>
              <FlatList
                style={styles.flatList}
                data={customLists}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.listContainer}
                      onPress={() => {
                        navigation.navigate("ListDetails", {
                          item,
                        });
                      }}
                    >
                      <View style={styles.listPoster}>
                        <Image
                          style={styles.listPosterImage}
                          defaultSource={require("../assets/images/poster2.jpg")}
                          source={
                            item.data.movies == undefined
                              ? require("../assets/images/poster2.jpg")
                              : {
                                  uri: `http://image.tmdb.org/t/p/w185/${
                                    Object.values(item.data.movies)[0]
                                      .posterPath
                                  }`,
                                }
                          }
                        ></Image>
                      </View>
                      <View style={styles.listData}>
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={{
                            fontSize: 20,
                            fontWeight: "600",
                            color: Colors.sixthColor,
                            marginBottom: 5,
                          }}
                        >
                          {item.data.listName}
                        </Text>
                        <Text>
                          Movies on this list:{" "}
                          {item.data.movies == undefined
                            ? "0"
                            : Object.values(item.data.movies).length}
                        </Text>
                      </View>
                      <View style={styles.listButtons}></View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
        </View>
        <View style={styles.underMenu}></View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listData: {
    padding: 10,
  },
  listPosterImage: {
    height: "100%",
    aspectRatio: 1 / 1.5,
  },
  listContainer: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: Colors.sixthColor,
    marginBottom: 15,
  },
  flatlistContainer: { flex: 1 },
  titleText: {
    fontFamily: "roboto-bold",
    fontSize: 20,
    color: Colors.sixthColor,
    letterSpacing: 1,
  },
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },
  emptyListContainer: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    padding: 10,
    flex: 9,
  },
  underMenu: {},
  imageBackground: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.fifthColor,
  },
});

export default ListsScreen;

{
  /* <Modal visible={false}>
      <MovieDetails hidePoster={moviePosterVisibilityHandler} />
    </Modal> */
}
