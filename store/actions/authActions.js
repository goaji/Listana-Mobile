export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const COMPLETE_REGISTRATION = "COMPLETE_REGISTRATION";
export const USER_DB_INIT = "USER_DB_INIT";
export const RECENT_MOVIES_INIT = "RECENT_MOVIES_INIT";
export const COMING_MOVIES_INIT = "COMING_MOVIES_INIT";

// loading data from the logged in user database
export const userDbInit = (ourUserKey) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://project-listana.firebaseio.com/lists/${ourUserKey}.json`
    );
    const responseData = await response.json();
    dispatch({ type: USER_DB_INIT, responseData });
  };
};

// loading the recent launched movies
// for whatever reason TBD this action does not complete what's inside "return" without an argument (loggedinUser)
// commingMoviesInit too
// lost half a day with this thing
// LE turns out you need to have the try catch wrapper
export const recentMoviesInit = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=929232d9b0b2af7e953d17654808d31f&language=en-US&page=1"
      );
      const responseJson = await response.json();
      const responseData = responseJson.results;
      dispatch({ type: RECENT_MOVIES_INIT, responseData });
    } catch (err) {
      console.log(err);
    }
  };
};

// loading the coming movies
export const comingMoviesInit = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=929232d9b0b2af7e953d17654808d31f&language=en-US&page=1`
      );
      const responseJson = await response.json();
      const responseData = responseJson.results;
      dispatch({ type: COMING_MOVIES_INIT, responseData });
    } catch (err) {
      console.log(err);
    }
  };
};

export const completeRegistration = (
  firstName,
  lastName,
  age,
  loggedInUser
) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://project-listana.firebaseio.com/lists/${loggedInUser}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          age: age,
          firstTimeLogin: false,
        }),
      }
    );
    dispatch({ type: COMPLETE_REGISTRATION });
  };
};

export const register = (newEmail, newPassword) => {
  //dispatch is an argument
  return async (dispatch) => {
    //wait for the response
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAX7rXceNOYyzq1LqcoVo_RPjbLYxvydbc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newEmail,
          password: newPassword,
          returnSecureToken: true,
        }),
      }
    );
    // if (!response.ok) {
    //   throw new Error("Something went wrong");
    // }
    //this will transform the response from JSON to an javascript object or array
    const responseData = await response.json();
    const newUserId = responseData.localId;
    const newUserEmail = responseData.email;
    //create a new entry for the new member in the database

    const newResponse = await fetch(
      "https://project-listana.firebaseio.com/lists.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: newUserId,
          firstName: "",
          lastName: "",
          firstTimeLogin: true,
          email: newUserEmail,
          photo: "",
          age: "",
          myLists: {
            myMovies: {
              listName: "My Movies",
              movies: [],
            },
          },
        }),
      }
    );
    dispatch({ type: REGISTER });
  };
};

export const login = (newEmail, newPassword) => {
  //dispatch is an argument
  return async (dispatch) => {
    //wait for the response
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAX7rXceNOYyzq1LqcoVo_RPjbLYxvydbc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newEmail,
          password: newPassword,
          returnSecureToken: true,
        }),
      }
    );
    var ourUser = "";
    var ourUserKey = "";
    //this will transform the response from JSON to an javascript object or array
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error("Something went wrong");
    } else {
      //search for the user in the database
      ourUser = responseData.localId;
      const newResponse = await fetch(
        "https://project-listana.firebaseio.com/lists.json"
      );
      const newResponseData = await newResponse.json();
      for (const key in newResponseData) {
        if (ourUser === newResponseData[key].userId) {
          ourUserKey = key;
        }
      }

      dispatch({ type: LOGIN, ourUserKey });
    }
  };
};
