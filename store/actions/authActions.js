export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const INITIALIZE = "INITIALIZE";
export const COMPLETE_REGISTRATION = "COMPLETE_REGISTRATION";
export const REINITIALIZE = "REINITIALIZE";

export const reinitialize = (loggedInUser) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://project-listana.firebaseio.com/lists/${loggedInUser}.json`
    );
    const responseData = await response.json();

    dispatch({ type: REINITIALIZE, responseData });
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
    console.log(responseData);
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
          myLists: { myMovies: { listName: "My Movies", movies: "" } },
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
    var ourUserDatabase = "";
    //this will transform the response from JSON to an javascript object or array
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error("Something went wrong");
    } else {
      ourUser = responseData.localId;
      const newResponse = await fetch(
        "https://project-listana.firebaseio.com/lists.json"
      );
      const newResponseData = await newResponse.json();
      for (const key in newResponseData) {
        if (ourUser === newResponseData[key].userId) {
          ourUserKey = key;
          ourUserDatabase = newResponseData[key];
        }
      }
      dispatch({ type: INITIALIZE, ourUserDatabase });
      dispatch({ type: LOGIN, ourUserKey });
    }
  };
};
