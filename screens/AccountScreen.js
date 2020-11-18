import React from "react";
import { useSelector } from "react-redux";

import {
  ImageBackground,
  Dimensions,
  View,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import Colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const AccountScreen = (props) => {
  const firstName = useSelector(
    (state) => state.authReducer.ourUserDatabase.firstName
  );
  const lastName = useSelector(
    (state) => state.authReducer.ourUserDatabase.lastName
  );
  const email = useSelector((state) => state.authReducer.ourUserDatabase.email);
  const memberSince = useSelector(
    (state) => state.authReducer.ourUserDatabase.dateCreated
  );

  const favoritesList = useSelector((state) =>
    state.authReducer.ourUserDatabase.favoriteMovies.movies == undefined
      ? []
      : Object.values(state.authReducer.ourUserDatabase.favoriteMovies.movies)
  );

  const theCustomLists = useSelector((state) =>
    state.authReducer.ourUserDatabase.customLists == undefined
      ? {}
      : state.authReducer.ourUserDatabase.customLists
  );

  const customLists = [];

  Object.keys(theCustomLists).forEach((key) =>
    customLists.push({ id: key, data: theCustomLists[key] })
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        imageStyle={{ resizeMode: "stretch" }}
        source={require("../assets/images/background1.png")}
        style={styles.imageBackground}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Your account</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.squareContainer}>
            <View
              style={{
                borderWidth: 4,
                borderColor: Colors.firstColor,

                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  overflow: "hidden",
                  width: height > 700 ? 150 : 125,
                  height: height > 700 ? 150 : 125,
                  transform: [{ rotate: "-45deg" }],
                }}
                defaultSource={require("../assets/images/account.jpg")}
                source={require("../assets/images/account.jpg")}
              />
            </View>
          </View>
          <Text
            style={{
              marginTop: height > 700 ? 40 : 30,
              fontSize: 25,
              color: Colors.sixthColor,
              fontWeight: "500",
            }}
          >
            {firstName} {lastName}
          </Text>
          <View
            style={{
              flex: 1,
              borderWidth: 3,
              marginTop: 20,
              width: "95%",
              backgroundColor: Colors.secondColor,
              borderColor: Colors.firstColor,
              borderRadius: 20,
              padding: 5,
              justifyContent: "center",
            }}
          >
            <View style={styles.miniContainer}>
              <View style={styles.leftSideContainer}>
                <Text style={styles.leftSide}>Email:</Text>
              </View>
              <View style={styles.rightSideContainer}>
                <Text style={styles.rightSide}>{email}</Text>
              </View>
            </View>
            <View style={styles.miniContainer}>
              <View style={styles.leftSideContainer}>
                <Text style={styles.leftSide}>Member since: </Text>
              </View>
              <View style={styles.rightSideContainer}>
                <Text style={styles.rightSide}>{memberSince}</Text>
              </View>
            </View>
            <View style={styles.miniContainer}>
              <View style={styles.leftSideContainer}>
                <Text style={styles.leftSide}>Lists created:</Text>
              </View>
              <View style={styles.rightSideContainer}>
                <Text style={styles.rightSide}>{customLists.length}</Text>
              </View>
            </View>
            <View style={styles.miniContainer}>
              <View style={styles.leftSideContainer}>
                <Text style={styles.leftSide}>Favorite movies:</Text>
              </View>
              <View style={styles.rightSideContainer}>
                <Text style={styles.rightSide}>{favoritesList.length}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.TMDBContainer}>
          <View style={{ flex: 1, alignItems: "center", marginRight: 25 }}>
            <Image
              style={{
                resizeMode: "contain",
                height: "50%",
              }}
              defaultSource={require("../assets/images/TMDB_logo.png")}
              source={require("../assets/images/TMDB_logo.png")}
            />
          </View>
          <View
            style={{
              flex: 2,
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: height > 850 ? 16 : 13,
                color: Colors.sixthColor,
              }}
            >
              This product uses the TMDb API but is not endorsed or certified by
              TMDb.
            </Text>
          </View>
        </View>
        <View style={{ height: height > 700 ? 60 : 50 }}></View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  miniContainer: {
    flexDirection: "row",
    marginBottom: 3,
  },
  rightSideContainer: {
    alignItems: "flex-start",
    flex: 1,
    padding: 5,
  },
  leftSideContainer: {
    alignItems: "flex-end",
    flex: 1,
    padding: 5,
  },
  leftSide: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.sixthColor,
  },
  rightSide: { fontSize: 15, fontWeight: "300", color: Colors.sixthColor },
  //find a formula to adapt to every screen size
  squareContainer: {
    paddingHorizontal: height > 700 ? 5 : 4,
    paddingVertical: height > 700 ? 30 : 25,
    borderWidth: 4,
    borderColor: Colors.fifthColor,
    overflow: "hidden",
    width: height > 700 ? 125 : 100,
    height: height > 700 ? 125 : 100,
    transform: [{ rotate: "45deg" }],
    justifyContent: "center",

    marginTop: 30,
  },
  contentContainer: {
    flex: 7,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  TMDBContainer: {
    margin: 20,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderBottomColor: Colors.sixthColor,
    borderTopColor: Colors.sixthColor,
    paddingHorizontal: 20,
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  titleText: {
    fontFamily: "roboto-bold",
    fontSize: 30,
    color: Colors.sixthColor,
    letterSpacing: 1,
  },
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 2,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.fifthColor,
  },
});

export default AccountScreen;
