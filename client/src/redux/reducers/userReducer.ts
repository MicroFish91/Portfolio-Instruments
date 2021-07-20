import { action } from "../actions/types";
import { REGISTER } from "../actions/user/userConstants";

const INITIAL_STATE = {
  currentUser: null,
  token: "",
  error: {},
};

const userReducer = (state = INITIAL_STATE, action: action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
