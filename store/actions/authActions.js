export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";

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
    //create a new entry for the new member in the database
    const newResponse = await fetch();
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
    // if (!response.ok) {
    //   throw new Error("Something went wrong");
    // }
    //this will transform the response from JSON to an javascript object or array
    const responseData = await response.json();
    const ourUser = responseData.localId;
    dispatch({ type: LOGIN, ourUser });
  };
};
