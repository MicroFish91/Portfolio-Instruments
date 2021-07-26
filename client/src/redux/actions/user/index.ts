import { USER_TYPES } from "../../constants";
import { action, userLogin, userRegistration } from "../../types";

export const register = (user: userRegistration): action => {
  return {
    type: USER_TYPES.REGISTER,
    payload: user,
  };
};

export const registerSuccess = (jwtToken: string): action => {
  return {
    type: USER_TYPES.REGISTER_SUCCESS,
    payload: jwtToken,
  };
};

export const registerFail = (err: any): action => {
  return {
    type: USER_TYPES.REGISTER_FAIL,
    payload: err,
  };
};

export const login = (user: userLogin): action => {
  return {
    type: USER_TYPES.LOGIN,
    payload: user,
  };
};

export const loginSuccess = (jwtToken: string): action => {
  return {
    type: USER_TYPES.LOGIN_SUCCESS,
    payload: jwtToken,
  };
};

export const loginFail = (err: any): action => {
  return {
    type: USER_TYPES.LOGIN_FAIL,
    payload: err,
  };
};
