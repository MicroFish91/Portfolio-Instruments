import { USER_TYPES } from "../constants";
import { action } from "../types";

const INITIAL_STATE = {
  currentUser: {
    email: "",
    firstName: "",
    lastName: "",
  },
  jwtToken: "",
  error: {
    status: "",
    message: "",
  },
  isLoading: false,
};

const userReducer = (state = INITIAL_STATE, action: action) => {
  switch (action.type) {
    case USER_TYPES.LOGIN || USER_TYPES.REGISTER:
      return {
        ...state,
        isLoading: true,
      };
    case USER_TYPES.REGISTER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        jwtToken: action.payload.jwtToken,
        error: {
          status: "",
          message: "",
        },
        isLoading: false,
      };
    case USER_TYPES.REGISTER_FAIL:
      return {
        ...state,
        currentUser: {
          email: "",
          firstName: "",
          lastName: "",
        },
        jwtToken: "",
        error: action.payload,
        isLoading: false,
      };
    case USER_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        jwtToken: action.payload.jwtToken,
        error: {
          status: "",
          message: "",
        },
        isLoading: false,
      };
    case USER_TYPES.LOGIN_FAIL:
      return {
        ...state,
        currentUser: {
          email: "",
          firstName: "",
          lastName: "",
        },
        jwtToken: "",
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
