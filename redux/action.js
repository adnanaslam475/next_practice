import * as types from "./types";
// import * as firebase from 'firebase/app';
// import db from "../firebaseconfig";
import cookie from "js-cookie";

export const registers = (data) => {
  console.log("thus=>", data);
  return {
    type: types.REGISTER,
  };
};

export const reauthenticate = (token) => {
  console.log("reauthenticater->");
  return (dispatch) => {
    dispatch({ type: types.REGISTER, payload: token });
  };
};

export const setCookie = (key, value) => {
  console.log("setCookie");
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: "/",
    });
  }
};

export const register = (inputValues) => {
  console.log("inps1======>", inputValues);
  return async (dispatch) => {
    try {
      const { email, password } = inputValues;
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASKkgxQzr4xdqqKTbRtaa5qatpUepiPvI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
      );
      const resData = await res.json();
      console.log("resdta=>", resData);
      setCookie("token", resData.token);
      if (!res.ok) {
        const errorId = resData.error.message;
        console.log("exist-->", errorId);
        if (errorId === "EMAIL_EXISTS") {
        } else {
          console.log("else35->");
        }
      } else {
        // await db.collection("users").add(inputValues);
        // let d = new Date();
        // d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
        // const user = {
        //   email: data.email,
        //   token: data.idToken,
        //   userId: data.localId,
        // };
        // var expires = "expires=" + d.toUTCString();
        // document.cookie =
        //   "user" + "=" + JSON.stringify(user) + ";" + expires + ";path=/";
      }
    } catch (error) {
      console.log("errr49=>", error);
    }
  };
};

export const login = async (inputValues) => {
  console.log("inps======>", inputValues);
  return async (dispatch) => {
    try {
      const { email, password } = inputValues;
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASKkgxQzr4xdqqKTbRtaa5qatpUepiPvI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );
      const data = await res.json();
      if (data.error?.errors) {
        console.log(data.error);
        commit("error", data.error.message, { root: true });
      } else {
        let d = new Date();
        d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
        const user = {
          email: data.email,
          token: data.idToken,
          userId: data.localId,
        };
        var expires = "expires=" + d.toUTCString();
        document.cookie =
          "user" + "=" + JSON.stringify(user) + ";" + expires + ";path=/";
        store.commit("user", user, { root: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
