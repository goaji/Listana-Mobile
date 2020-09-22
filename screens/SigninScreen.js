import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Colors from "../constants/colors";

import SplashButtonContainer from "../components/splashScreen/splashButtonContainer";
import RegisterForm from "../components/splashScreen/registerForm";
import LoginForm from "../components/splashScreen/loginForm";

const { width, height } = Dimensions.get("window");

const SigninScreen = (props) => {
  const [mainContainerVisibility, setMainContainerVisibility] = useState(true);
  const [loginFormVisibility, setLoginFormVisibility] = useState(false);
  const [registerFormVisibility, setRegisterFormVisibility] = useState(false);

  const buttonsContainerVisibilityHandler = (buttonPressed) => {
    if (buttonPressed === "login") {
      setMainContainerVisibility(false);
      setRegisterFormVisibility(false);
      setLoginFormVisibility(true);
    } else if (buttonPressed === "register") {
      setMainContainerVisibility(false);
      setLoginFormVisibility(false);
      setRegisterFormVisibility(true);
    } else if (buttonPressed === "cancel") {
      setLoginFormVisibility(false);
      setRegisterFormVisibility(false);
      setMainContainerVisibility(true);
    } else if (buttonPressed === "register-complete") {
      setLoginFormVisibility(false);
      setRegisterFormVisibility(false);
      setMainContainerVisibility(true);
    } else if (buttonPressed === "login-complete") {
      props.navigation.navigate("MainScreen");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ ...StyleSheet.absoluteFill }}>
        <Image
          source={require("../assets/images/bg.jpg")}
          style={styles.backgroundImage}
        />
      </View>
      <View style={styles.titlesContainer}>
        <Text style={styles.mainTitle}>LISTANA</Text>
        <Text style={styles.secondTitle}>Movies you've seen.</Text>
        <Text style={styles.secondTitle}>Movies you love.</Text>
        <Text style={styles.secondTitle}>Movies you'll never forget.</Text>
      </View>
      <View style={styles.emptyContainer}></View>
      <View style={styles.buttonContainer}>
        {mainContainerVisibility && (
          <SplashButtonContainer
            buttonsContainerVisibility={buttonsContainerVisibilityHandler}
          />
        )}
        {registerFormVisibility && (
          <RegisterForm
            buttonsContainerVisibility={buttonsContainerVisibilityHandler}
          />
        )}
        {loginFormVisibility && (
          <LoginForm
            buttonsContainerVisibility={buttonsContainerVisibilityHandler}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Colors.firstColor,
  },
  backgroundImage: {
    flex: 1,
    height: null,
    width: null,
  },
  titlesContainer: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  mainTitle: {
    fontSize: 50,
    color: Colors.secondColor,
    textAlign: "center",
    paddingBottom: 20,
  },
  secondTitle: {
    fontSize: 25,
    color: Colors.thirdColor,
    textAlign: "center",
    paddingBottom: 5,
  },
  buttonContainer: {
    height: height / 6,
    backgroundColor: Colors.fourthColor,
  },
  emptyContainer: {
    height: height / 3,
  },
});

export default SigninScreen;
