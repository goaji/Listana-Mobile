import {
  MOVIE_CAST,
  RESET_MOVIE_CAST,
  HANDLE_FAVORITE_LIST_ADD,
  HANDLE_FAVORITE_LIST_DELETE,
  GET_MOVIE_DETAILS,
} from "../actions/movieActions";

const initialState = {
  movieCast: [],
  movieDetails: {
    backdrop_path: "test",
    genres: { id: {} },
    release_date: "",
    vote_average: 0,
    overview: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.responseData,
      };
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
        ...state,
        movieCast: [],
      };
    default:
      return state;
  }
};
