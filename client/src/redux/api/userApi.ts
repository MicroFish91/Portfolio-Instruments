import axios from "axios";
import { LoginForm, RegistrationForm } from "../../validation/types";
import { USER_ENDPOINT } from "./constants";
import {
  IncomingUserFetchStandardized,
  IncomingUserLoginFetchRaw,
  IncomingUserRegistrationFetchRaw,
} from "./types";

export async function userLoginApi(
  userData: LoginForm
): Promise<IncomingUserFetchStandardized> {
  try {
    const tokenResponse: IncomingUserLoginFetchRaw = await axios.post(
      USER_ENDPOINT.LOGIN,
      userData
    );
    return {
      data: {
        currentUser: tokenResponse.data.currentUser,
        jwtToken: tokenResponse.data.token,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        status: error.response.status,
        message: error.message,
      },
    };
  }
}

export async function userRegistrationApi(
  userData: RegistrationForm
): Promise<IncomingUserFetchStandardized> {
  try {
    const tokenResponse: IncomingUserRegistrationFetchRaw = await axios.post(
      USER_ENDPOINT.REGISTER,
      userData
    );
    return {
      data: {
        currentUser: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
        },
        jwtToken: tokenResponse.data.token,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        status: error.response.status,
        message: error.response.data.message,
      },
    };
  }
}
