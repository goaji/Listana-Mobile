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
  TextInput,
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

  const [showAddListForm, setShowAddListForm] = useState(false);
  const [listName, setListName] = useState("");

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
            <TouchableOpacity onPress={() => setShowAddListForm(true)}>
              <MaterialComunityIcons
                size={40}
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
                              ? require("../assets/images/poster3.jpg")
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
                        <View
                          style={{
                            borderBottomWidth: 5,
                            borderBottomColor: Colors.sixthColor,
                          }}
                        >
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={{
                              textTransform: "uppercase",
                              fontSize: 20,
                              fontWeight: "600",
                              color: Colors.sixthColor,
                              marginBottom: 10,
                            }}
                          >
                            {item.data.listName}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "400",
                            color: Colors.sixthColor,
                            marginBottom: 5,
                          }}
                        >
                          Movies on this list:{" "}
                          {item.data.movies == undefined
                            ? "0"
                            : Object.values(item.data.movies).length}
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "400",
                            color: Colors.sixthColor,
                            marginBottom: 5,
                          }}
                        >
                          This list was created on {item.data.dateCreated}
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
        <Modal visible={showAddListForm} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalPopup}>
              <View style={{ alignItems: "center" }}>
                <View>
                  <Text style={styles.addListTitleText}>
                    Name of the new list:
                  </Text>
                  <TextInput
                    autoCapitalize="none"
                    value={listName}
                    onChangeText={(value) => setListName(value)}
                    style={styles.textInput}
                  />
                </View>
                <View>
                  <View style={styles.addListButtonsContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={async () => {
                        await dispatch(
                          movieActions.createNewList(loggedInUser, listName)
                        );
                        await dispatch(authActions.userDbInit(loggedInUser));
                        setListName("");
                        setShowAddListForm(false);
                      }}
                    >
                      <Text style={styles.textButton}>Create</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        setListName("");
                        setShowAddListForm(false);
                      }}
                    >
                      <Text style={styles.textButton}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listData: {
    padding: 10,
    justifyContent: "space-between",
  },
  listPosterImage: {
    height: "100%",
    aspectRatio: 1 / 1.5,
    borderWidth: 3,
    borderColor: Colors.fifthColor,
  },
  listContainer: {
    flexDirection: "row",
    width: "100%",
    height: 170,
    borderWidth: 5,
    borderColor: Colors.firstColor,
    backgroundColor: Colors.secondColor,
    marginBottom: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  flatlistContainer: { flex: 1 },
  titleText: {
    fontFamily: "roboto-bold",
    fontSize: 30,
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
  addListTitleText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: Colors.firstColor,
  },
  textButton: {
    textAlign: "center",
    color: Colors.sixthColor,
    fontSize: 17,
    fontFamily: "roboto-medium",
  },
  addListButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.fourthColor,
    width: width / 3,
    height: 50,
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: Colors.thirdColor,
    marginHorizontal: 10,
  },
  textInput: {
    width: 270,
    height: 30,
    backgroundColor: Colors.sixthColor,
    marginVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalPopup: {
    paddingVertical: 20,
    height: 210,
    width: width * 0.9,
    borderWidth: 5,
    borderColor: Colors.firstColor,
    backgroundColor: Colors.fifthColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    // dont' forget to add some shaddow
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(22, 29, 45, 0.85)",
  },
});

export default ListsScreen;

{
  /* <Modal visible={false}>
      <MovieDetails hidePoster={moviePosterVisibilityHandler} />
    </Modal> */
}
