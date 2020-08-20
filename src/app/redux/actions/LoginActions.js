import jwtAuthService from "../../services/jwtAuthService";
// import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
import { setUserData } from "./UserActions";
import { toast } from "react-toastify";
// import history from "history.js";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";

export function loginWithEmailAndPassword({ email, password },history, loginService) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    jwtAuthService
      .loginWithEmailAndPassword(email, password,loginService)
      .then(user => {
        dispatch(setUserData(user));

        console.log("history",history)
        history.push({
          pathname: "/home/dashboard"
        });

        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(error => {
        console.log("error after", error)
        toast.error( error.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose:5000
        });
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}

export function resetPassword({ email }) {
  return dispatch => {
    dispatch({
      payload: email,
      type: RESET_PASSWORD
    });
  };
}
