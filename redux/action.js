import * as types from "./types";
import * as firebase from "firebase/auth";
// import * as firebase from "firebase";
import db from "../firebaseconfig";
import Router from "next/router";

import cookie from "js-cookie";
import { notification } from "../Components/notification";

export const registerSuccess = (data) => {
  return {
    type: types.REGISTER,
    payload: data,
  };
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};
export const logout = (...props) => {
  const [key, notify, closeSnackbar] = props;
  return async (dispatch) => {
    const res = await firebase.getAuth().signOut();
    // const res = await firebase.auth().signOut();
    dispatch({ type: "AUTHENTICATE", payload: null });

    removeCookie(key);
    notification("success", "Logout Successfully", notify, closeSnackbar);
    try {
    } catch (error) {
      notification("error", "Cannot Logout", notify, closeSnackbar);
    }
  };
};
export const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};

export const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  console.log("ifffffffffffff", key, req);
  const rawCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`));
  console.log("rawcoke----->", rawCookie);
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split("=")[1];
};

export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

export const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch({ type: "AUTHENTICATE", payload: token });
  };
};

export const checkServerSideCookie = (ctx) => {
  const token = getCookie("token", ctx.req);
  console.log("token40-->", token);
  if (token) {
    ctx.store.dispatch(reauthenticate(token));
  }
};
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 7,
      path: "",
    });
  }
};

export const register = (...props) => {
  const [inputValues, notify, closeSnackbar] = props;
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
      dispatch(registerSuccess(resData));
      if (!res.ok) {
        const errorId = resData.error.message;
        if (errorId === "EMAIL_EXISTS") {
          notification("error", errorId, notify, closeSnackbar);
        }
      } else {
        setCookie("token", resData.idToken);
        notification(
          "success",
          "Registered successfully",
          notify,
          closeSnackbar
        );
        Router.push("/");
      }
    } catch (error) {
      notification("error", error, notify, closeSnackbar);
    }
  };
};

export const login = (...props) => {
  const [inputValues, notify, closeSnackbar] = props;
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
        notification("error", data.error.message, notify, closeSnackbar);
      } else {
        dispatch(registerSuccess(data));
        setCookie("token", data.idToken);
        notification("success", "Login successfully", notify, closeSnackbar);
        Router.push("/");
      }
    } catch (error) {
      notification("error", error, notify, closeSnackbar);
    }
  };
};
