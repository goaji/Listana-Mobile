export const REMOVE_MOVIE_FROM_LIST = "REMOVE_MOVIE_FROM_LIST";
export const REMOVE_LIST = "REMOVE_LIST";
export const ADD_LIST = "ADD_LIST";
export const SAVE_SEARCH_RESULTS = "SAVE_SEARCH_RESULTS";
import ListDatabase from "../../models/listsDatabase";

export const addList = (listName, movies, ownerId) => {
  return async (dispatch) => {
    //had to build this new object, otherwise the json.stringify won't work as intended
    const theNewList = new ListDatabase(listName, movies, ownerId);
    const response = await fetch(
      "https://listanamobile.firebaseio.com/alllists.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(theNewList),
      }
    );

    const responseData = await response.json();

    dispatch({
      type: ADD_LIST,
      listData: {
        listName,
        movies,
        ownerId,
      },
    });
  };
};

export const removeMovieFromList = (arrayId, listId) => {
  return {
    type: REMOVE_MOVIE_FROM_LIST,
    movieArrayId: arrayId,
    currentListId: listId,
  };
};

export const removeList = (listId) => {
  return { type: REMOVE_LIST, currentListId: listId };
};

export const saveSearchResults = (movieResults) => {
  return { type: SAVE_SEARCH_RESULTS, movieResults };
};
