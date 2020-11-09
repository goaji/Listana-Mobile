import {
  MOVIE_CAST,
  RESET_MOVIE_CAST,
  HANDLE_FAVORITE_LIST_ADD,
  HANDLE_FAVORITE_LIST_DELETE,
} from "../actions/movieActions";

const initialState = {
  movieCast: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_FAVORITE_LIST_ADD:
      return state;
    case HANDLE_FAVORITE_LIST_DELETE:
      return state;
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
