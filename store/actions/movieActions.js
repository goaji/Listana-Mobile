export const MOVIE_CAST = "MOVIE_CAST";
export const RESET_MOVIE_CAST = "RESET_MOVIE_CAST";
export const HANDLE_FAVORITE_LIST_ADD = "HANDLE_FAVORITE_LIST_ADD";
export const HANDLE_FAVORITE_LIST_DELETE = "HANDLE_FAVORITE_LIST_DELETE";
export const GET_MOVIE_DETAILS = "GET_MOVIE_DETAILS";
export const CREATE_NEW_LIST = "CREATE_NEW_LIST";
export const ADD_MOVIE_TO_LIST = "ADD_MOVie_TO_LIST";
export const REMOVE_MOVIE_FROM_LIST = "REMOVE_MOVIE_FROM_LIST";

export const removeMovieFromList = (loggedInUser, listId, entryId) => {
  console.log(loggedInUser, listId, entryId);
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://project-listana.firebaseio.com/lists/${loggedInUser}/customLists/${listId}/movies/${entryId}.json`,
        { method: "DELETE" }
      );
      const resData = await response.json();
      dispatch({ type: REMOVE_MOVIE_FROM_LIST });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addMovieToList = (loggedInUser, listId, movieKey, posterPath) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://project-listana.firebaseio.com/lists/${loggedInUser}/customLists/${listId}/movies.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId: movieKey,
            posterPath,
          }),
        }
      );
      const resData = await response.json();
      dispatch({ type: ADD_MOVIE_TO_LIST });
    } catch (err) {
      console.log(err);
    }
  };
};

//this will create a new list with a movie in it from the MovieDetailsScreen
export const createNewList = (loggedInUser, listName, movieKey, posterPath) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://project-listana.firebaseio.com/lists/${loggedInUser}/customLists.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listName,
          }),
        }
      );
      const resData = await response.json();

      const response2 = await fetch(
        `https://project-listana.firebaseio.com/lists/${loggedInUser}/customLists/${resData.name}/movies.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId: movieKey,
            posterPath,
          }),
        }
      );
      const resData2 = await response2.json();

      dispatch({ type: CREATE_NEW_LIST });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getMovieDetails = (movieId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=929232d9b0b2af7e953d17654808d31f&language=en-US`
      );
      const responseData = await response.json();
      dispatch({ type: GET_MOVIE_DETAILS, responseData });
    } catch (err) {
      console.log(err);
    }
  };
};

export const handleFavoritesList = (
  itemId,
  method,
  loggedInUser,
  posterPath
) => {
  try {
    return async (dispatch) => {
      if (method === "add") {
        console.log("add");
        const response = await fetch(
          `https://project-listana.firebaseio.com/lists/${loggedInUser}/myLists/myMovies/movies.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              itemId,
              posterPath,
            }),
          }
        );
        const resData = await response.json();
        dispatch({ type: HANDLE_FAVORITE_LIST_ADD });
      } else if (method === "remove") {
        const response = await fetch(
          `https://project-listana.firebaseio.com/lists/${loggedInUser}/myLists/myMovies/movies/${itemId}.json`,
          {
            method: "DELETE",
          }
        );
        const resData = await response.json();
        dispatch({ type: HANDLE_FAVORITE_LIST_DELETE });
      }
    };
  } catch (err) {
    console.log(err);
  }
};

export const movieCast = (movieId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=929232d9b0b2af7e953d17654808d31f`
      );
      const resData = await response.json();
      const responseData = resData.cast;
      dispatch({ type: MOVIE_CAST, responseData });
    } catch (err) {
      console.log(err);
    }
  };
};

export const resetMovieCast = () => {
  return { type: RESET_MOVIE_CAST };
};
