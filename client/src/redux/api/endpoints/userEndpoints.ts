import axios from "axios";
import { LoginForm, RegistrationForm } from "../../../validation/types";
import {
  IncomingUserFetchStandardized,
  IncomingUserLoginFetchRaw,
  IncomingUserRegistrationFetchRaw,
} from "../types";
import { USER_ENDPOINT } from "./constants";

export async function userLoginEndpoint(
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

export async function userRegistrationEndpoint(
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
