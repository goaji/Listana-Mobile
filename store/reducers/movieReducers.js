import { MOVIE_CAST, RESET_MOVIE_CAST } from "../actions/movieActions";

const initialState = {
  movieCast: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MOVIE_CAST:
      return {
        ...state,
        movieCast: action.responseData,
      };
    case RESET_MOVIE_CAST:
      return {
        state,
        movieCast: [],
      };
    default:
      return state;
  }
};
