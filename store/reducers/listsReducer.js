import USERS from "../../data/dummy-data-users";
import LISTS from "../../data/dummy-data-lists";
import {
  REMOVE_MOVIE_FROM_LIST,
  REMOVE_LIST,
  ADD_LIST,
} from "../actions/listsAction";
import ListDatabase from "../../models/listsDatabase";
const initialState = {
  myLists: LISTS,
  users: USERS,
};
//this is very important: state will be initialized with initialState only if state is undefine
//so basicaly only the first time - ES6 feature, you can set a default value for undefined cases
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST:
      const theNewList = new ListDatabase(
        action.listData.listName,
        action.listData.movies,
        action.listData.ownerId
      );
      return {
        ...state,
        myLists: state.myLists.concat(theNewList),
      };

    case REMOVE_MOVIE_FROM_LIST:
      //copy all lists to updatedList
      const updatedList = [...state.myLists];
      // find the list we're removing from by id
      const currentList = updatedList.find(
        (list) => list.listId === action.currentListId
      );
      //removing the item from the list
      currentList.movies.splice(action.movieArrayId, 1);
      //updating the state
      return {
        ...state,
        myLists: updatedList,
      };

    case REMOVE_LIST:
      // /copy all lists to updatedList
      const newList = [...state.myLists];
      //finding the one that matches our id
      for (let i = 0; i < newList.length; i++) {
        if (newList[i].listId === action.currentListId) {
          newList.splice(i, 1);
          break;
        }
      }
      return {
        ...state,
        myLists: newList,
      };
      // default:
      return state;
  }

  return state;
};
