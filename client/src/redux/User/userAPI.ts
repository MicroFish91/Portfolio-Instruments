import axios from "axios";
import { LoginForm, RegistrationForm } from "../../validation/types";
import { API_ROUTES } from "./userConstants";
import { CurrentUser, userFetchedData } from "./userTypes";

export async function userLoginAPI(
  userData: LoginForm
): Promise<
  userFetchedData<
    ({ jwtToken: string } & { currentUser: CurrentUser }) | null,
    any
  >
> {
  try {
    const tokenResponse: { data: { token: string; currentUser: CurrentUser } } =
      await axios.post(API_ROUTES.LOGIN, userData);
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

export async function userRegistrationAPI(
  userData: RegistrationForm
): Promise<
  userFetchedData<
    ({ jwtToken: string } & { currentUser: CurrentUser }) | null,
    any
  >
> {
  try {
    const tokenResponse: { data: { token: string } } = await axios.post(
      API_ROUTES.REGISTER,
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
