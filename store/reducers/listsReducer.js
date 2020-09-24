import USERS from "../../data/dummy-data-users";
import LISTS from "../../data/dummy-data-lists";
import { CREATE_LIST } from "../actions/listsAction";

const initialState = {
  myLists: LISTS,
  users: USERS,
};
//this is very important: state will be initialized with initialState only if state is undefine
//so basicaly only the first time - ES6 feature, you can set a default value for undefined cases
export default (state = initialState, action) => {
  // // switch ((action, type)) {
  //   case ADD_LIST:

  //   default:
  //     return state;
  // }
  return state;
};
