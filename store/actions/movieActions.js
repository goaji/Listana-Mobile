export const MOVIE_CAST = "MOVIE_CAST";
export const RESET_MOVIE_CAST = "RESET_MOVIE_CAST";

// loading data from the logged in user database
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
