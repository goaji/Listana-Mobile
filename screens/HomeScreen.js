import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Colors from "../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../store/actions/authActions";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const HomeScreen = (props) => {
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.authReducer.loggedInUser);
  const isFirstTime = useSelector(
    (state) => state.authReducer.ourUserDatabase.firstTimeLogin
  );
  const firstName = useSelector(
    (state) => state.authReducer.ourUserDatabase.firstName
  );
  const lastName = useSelector(
    (state) => state.authReducer.ourUserDatabase.lastName
  );
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNamedValue, setLastNameValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  //finish-you-account popup state handling
  const completeRegistrationHandler = () => {
    dispatch(
      authActions.completeRegistration(
        firstNameValue,
        lastNamedValue,
        ageValue,
        loggedInUser
      )
    );
    dispatch(authActions.userDbInit(loggedInUser));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        imageStyle={styles.imageBackgroundStyle}
        source={require("../assets/images/background1.png")}
        style={styles.imageBackground}
      >
        <View style={styles.homeScreenContainer}>
          {/* title section */}
          <View style={styles.container1}>
            <Text style={styles.helloText}>
              Hello, {firstName} {lastName}.
            </Text>
            <Text style={styles.helloText}>Welcome back!</Text>
          </View>

          {/* recently launched section */}
          <View style={styles.container2}>
            <Text style={styles.titleText}>Recently launched</Text>
            {/* https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1 */}
          </View>

          {/* upcoming movies section */}
          <View style={styles.container3}>
            <Text style={styles.titleText}>Upcoming movies</Text>
            <FlatList horizontal={true} />
            {/* https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1 */}
          </View>

          {/* last added section */}
          <View style={styles.container4}>
            <Text style={styles.titleText}>Last added</Text>
          </View>

          {/* this space will be empty, under the bottom menu */}
          <View style={styles.underMenu}></View>
        </View>
        <Modal visible={isFirstTime} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalPopup}>
              <View style={styles.containerSet}>
                <Text style={styles.textTitle}>Please complete</Text>
                <Text style={styles.textTitle}>your registration</Text>
              </View>
              <View style={styles.containerSet}>
                <Text style={styles.textInputText}>First Name</Text>
                <TextInput
                  autoCapitalize="none"
                  value={firstNameValue}
                  onChangeText={(value) => setFirstNameValue(value)}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.containerSet}>
                <Text style={styles.textInputText}>Last Name</Text>
                <TextInput
                  autoCapitalize="none"
                  value={lastNamedValue}
                  onChangeText={(value) => setLastNameValue(value)}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.containerSet}>
                <Text style={styles.textInputText}>Age</Text>
                <TextInput
                  autoCapitalize="none"
                  value={ageValue}
                  onChangeText={(value) => setAgeValue(value)}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.containerSet}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={completeRegistrationHandler}
                >
                  <Text style={styles.textButton}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
      <Text>activeUserLists.length</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "roboto-medium",
    fontSize: 15,
    color: Colors.sixthColor,
    letterSpacing: 0.5,
  },
  helloText: {
    fontFamily: "roboto-bold",
    fontSize: 20,
    color: Colors.sixthColor,
    letterSpacing: 3,
  },
  underMenu: {
    flex: 0.5,
  },
  container1: {
    padding: 10,
    paddingLeft: 20,
    flex: 2,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "red",
  },
  container2: {
    padding: 10,
    flex: 3,
    borderWidth: 2,
    borderColor: "red",
  },
  container3: {
    padding: 10,

    flex: 3,
    borderWidth: 2,
    borderColor: "red",
  },
  container4: {
    padding: 10,

    flex: 3,
    borderWidth: 2,
    borderColor: "red",
  },
  homeScreenContainer: {
    flex: 1,
  },
  imageBackgroundStyle: {
    resizeMode: "stretch",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
  },
  containerSet: {
    paddingBottom: 10,
  },
  textButton: {
    textAlign: "center",
    color: Colors.sixthColor,
    fontSize: 20,
    fontFamily: "roboto-medium",
  },

  button: {
    alignItems: "center",
    backgroundColor: Colors.fourthColor,
    width: 125,
    height: 50,
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: Colors.thirdColor,
    marginHorizontal: 10,
  },
  textInputText: {
    color: Colors.sixthColor,
    textAlign: "center",
  },
  textTitle: {
    fontWeight: "500",
    textTransform: "uppercase",
    fontSize: 25,
    color: Colors.sixthColor,
    textAlign: "center",
  },
  textInput: {
    width: 270,
    height: 30,
    backgroundColor: Colors.sixthColor,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  modalPopup: {
    alignSelf: "center",
    backgroundColor: Colors.thirdColor,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.8,
    height: height * 0.5,
    borderColor: Colors.fifthColor,
    borderWidth: 5,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: Colors.firstColor,
  },
});

export default HomeScreen;
