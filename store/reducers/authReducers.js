import { log } from "react-native-reanimated";
import {
  LOGIN,
  INITIALIZE,
  COMPLETE_REGISTRATION,
  REINITIALIZE,
} from "../actions/authActions";

const initialState = {
  loggedInUser: "nouser",
  ourUserDatabase: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REINITIALIZE:
      console.log("Data: ", action.responseData);
      return {
        ...state,
        ourUserDatabase: action.responseData,
      };
    case LOGIN:
      return {
        ...state,
        loggedInUser: action.ourUserKey,
      };
    case INITIALIZE:
      return {
        ...state,
        ourUserDatabase: action.ourUserDatabase,
      };
    default: {
      return state;
    }
  }
};
