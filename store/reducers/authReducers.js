import { log } from "react-native-reanimated";
import { LOGIN } from "../actions/authActions";

const initialState = {
  loggedInUser: "nouser",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedInUser: action.ourUser,
      };
    default: {
      return state;
    }
  }
};
