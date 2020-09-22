import USERS from "../../data/dummy-data-users";
import LISTS from "../../data/dummy-data-lists";

const initialState = {
  myLists: LISTS,
  users: USERS,
};

export default (state = initialState, action) => {
  return state;
};
