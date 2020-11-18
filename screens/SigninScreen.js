import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Colors from "../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../store/actions/authActions";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const SigninScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  //don't forget to specify state.`whateverreduceryouneed`.variable
  const loggedInUser = useSelector((state) => state.authReducer.loggedInUser);

  if (loggedInUser != "nouser") {
    dispatch(authActions.userDbInit(loggedInUser));
    dispatch(authActions.comingMoviesInit(loggedInUser));
    dispatch(authActions.recentMoviesInit(loggedInUser));
    navigation.navigate("MainScreen");
  }

  const loginHandler = () => {
    if (isLogin) {
      //try to login
      setIsLogin(false);
      dispatch(authActions.login(emailValue, passwordValue));
      setEmailValue("");
      setPasswordValue("");
    } else {
      //show the fields
      setIsLogin(true);
    }
  };
  const registerHandler = () => {
    if (isRegister) {
      const theDate = new Date();
      const date =
        theDate.getFullYear() +
        "/" +
        theDate.getMonth() +
        "/" +
        theDate.getDate();
      //try to register
      setIsRegister(false);
      dispatch(authActions.register(emailValue, passwordValue, date));
      setEmailValue("");
      setPasswordValue("");
    } else {
      //show register fields
      setIsRegister(true);
    }
  };
  const cancelHandler = () => {
    setEmailValue("");
    setPasswordValue("");
    setIsLogin(false);
    setIsRegister(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../assets/images/loginpage.png")}
        style={styles.container}
      >
        <View style={styles.upperThird}>
          <Image
            style={styles.logo}
            source={require("../assets/images/logoListana.png")}
          />
          <Text style={styles.mainTitle}>LISTANA</Text>
        </View>
        <View style={styles.middleThird}>
          <Text style={styles.secondTitle}>Movies you've seen.</Text>
          <Text style={styles.secondTitle}>Movies you love.</Text>
          <Text style={styles.secondTitle}>Movies you'll never forget.</Text>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={20}
          style={styles.bottomThird}
        >
          {(isLogin || isRegister) && (
            <View>
              <TextInput
                autoCapitalize="none"
                value={emailValue}
                onChangeText={(value) => setEmailValue(value)}
                style={styles.textInput}
              />
              <TextInput
                autoCapitalize="none"
                value={passwordValue}
                onChangeText={(value) => setPasswordValue(value)}
                style={styles.textInput}
              />
            </View>
          )}
          <View style={styles.loginContainer}>
            {(isLogin || (!isLogin && !isRegister)) && (
              <TouchableOpacity onPress={loginHandler} style={styles.button}>
                <Text style={styles.textButton}>Login</Text>
              </TouchableOpacity>
            )}
            {isLogin && (
              <TouchableOpacity onPress={cancelHandler} style={styles.button}>
                <Text style={styles.textButton}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
          {!isLogin && !isRegister && (
            <Text style={styles.accountText}>Don't have an account yet?</Text>
          )}
          <View style={styles.loginContainer}>
            {(isRegister || (!isLogin && !isRegister)) && (
              <TouchableOpacity onPress={registerHandler} style={styles.button}>
                <Text style={styles.textButton}>Register</Text>
              </TouchableOpacity>
            )}
            {isRegister && (
              <TouchableOpacity onPress={cancelHandler} style={styles.button}>
                <Text style={styles.textButton}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textInput: {
    width: 270,
    height: 30,
    backgroundColor: Colors.sixthColor,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textButton: {
    textAlign: "center",
    color: Colors.sixthColor,
    fontSize: 20,
    fontFamily: "roboto-medium",
  },
  accountText: {
    textAlign: "center",
    color: Colors.sixthColor,
    marginVertical: 10,
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
  logo: {
    height: "30%",
    resizeMode: "contain",
    marginBottom: 10,
  },
  upperThird: {
    flex: 1.5,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  middleThird: {
    flex: 1,
    justifyContent: "flex-start",
  },
  bottomThird: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50,
  },
  container: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 50,
    color: Colors.sixthColor,
    textAlign: "center",
    paddingBottom: 20,
    fontFamily: "roboto-medium",
    letterSpacing: 4,
  },
  secondTitle: {
    fontSize: 20,
    color: Colors.sixthColor,
    textAlign: "center",
    paddingBottom: 5,
    fontFamily: "roboto-light",
  },
});

export default SigninScreen;
