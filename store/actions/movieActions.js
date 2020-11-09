export const MOVIE_CAST = "MOVIE_CAST";
export const RESET_MOVIE_CAST = "RESET_MOVIE_CAST";
export const HANDLE_FAVORITE_LIST_ADD = "HANDLE_FAVORITE_LIST_ADD";
export const HANDLE_FAVORITE_LIST_DELETE = "HANDLE_FAVORITE_LIST_DELETE";

// loading data from the logged in user database
export const handleFavoritesList = (
  itemId,
  method,
  loggedInUser,
  posterPath
) => {
  console.log(itemId, method, loggedInUser, posterPath);
  try {
    return async (dispatch) => {
      if (method === "add") {
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
