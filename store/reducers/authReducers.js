import { log } from "react-native-reanimated";
import {
  LOGIN,
  USER_DB_INIT,
  RECENT_MOVIES_INIT,
  COMING_MOVIES_INIT,
} from "../actions/authActions";

const initialState = {
  loggedInUser: "nouser",
  ourUserDatabase: "",
  recentlyLaunched: "",
  upcomingMovies: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_DB_INIT:
      return {
        ...state,
        ourUserDatabase: action.responseData,
      };
    case COMING_MOVIES_INIT:
      console.log("Coming Movies:", action.responseData);
      return {
        ...state,
        upcomingMovies: action.responseData,
      };
    case RECENT_MOVIES_INIT:
      console.log("Recently Launchend:", action.responseData);
      return {
        ...state,
        recentlyLaunched: action.responseData,
      };
    case LOGIN:
      return {
        ...state,
        loggedInUser: action.ourUserKey,
      };
    default: {
      return state;
    }
  }
};
