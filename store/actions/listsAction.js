export const REMOVE_MOVIE_FROM_LIST = "REMOVE_MOVIE_FROM_LIST";
export const REMOVE_LIST = "REMOVE_LIST";
export const ADD_LIST = "ADD_LIST";
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
    console.log(responseData);

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
