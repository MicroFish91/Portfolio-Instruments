import { USER_TYPES } from "../../constants";
import { action, user } from "../../types";

export const register = (user: user): action => {
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
