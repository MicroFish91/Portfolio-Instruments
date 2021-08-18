import axios from "axios";
import { LoginForm, RegistrationForm } from "../../../validation/types";
import { getToken } from "../../User/userUtils";
import {
  IncomingChangePasswordFetchRaw,
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
          rebalanceThreshold: 10,
          vpThreshold: 0,
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

export async function confirmationEmailEndpoint(email: string): Promise<void> {
  try {
    await axios.post(USER_ENDPOINT.EMAIL_CONFIRMATION, { email });
  } catch (error) {
    console.log(error);
  }
}

export async function changePasswordEndpoint(
  currentPassword: string,
  newPassword: string
): Promise<IncomingUserFetchStandardized> {
  try {
    const userResponse: IncomingChangePasswordFetchRaw = await axios.post(
      USER_ENDPOINT.CHANGE_PASSWORD,
      { currentPassword, newPassword },
      {
        headers: {
          authorization: getToken(),
        },
      }
    );
    return {
      data: userResponse,
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
