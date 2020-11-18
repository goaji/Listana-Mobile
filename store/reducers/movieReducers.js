import {
  MOVIE_CAST,
  RESET_MOVIE_CAST,
  HANDLE_FAVORITE_LIST_ADD,
  HANDLE_FAVORITE_LIST_DELETE,
  GET_MOVIE_DETAILS,
  CREATE_NEW_LIST,
  REMOVE_MOVIE_FROM_LIST,
  SEARCH_MOVIE,
} from "../actions/movieActions";

const initialState = {
  movieCast: [],
  movieDetails: {
    backdrop_path: "test",
    genres: { id: {} },
    release_date: "",
    vote_average: 0,
    overview: "",
    poster_path: "",
  },
  searchResults: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MOVIE:
      return {
        ...state,
        searchResults: action.resData,
      };
    case REMOVE_MOVIE_FROM_LIST:
      return state;
    case CREATE_NEW_LIST:
      return state;
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
