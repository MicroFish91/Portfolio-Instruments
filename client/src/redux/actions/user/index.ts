import { action } from "../types";
import { REGISTER } from "./userConstants";
import { user } from "./userTypes";

export const register = (user: user): action => {
  return {
    type: REGISTER,
    payload: user,
  };
};
