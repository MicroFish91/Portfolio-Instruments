import axios from "axios";
import { API_ROUTES } from "../constants";
import { user, userFetchedData, userLogin, userRegistration } from "../types";

export async function login(
  userData: userLogin
): Promise<
  userFetchedData<({ jwtToken: string } & { currentUser: user }) | null, any>
> {
  try {
    const tokenResponse: { data: { token: string; currentUser: user } } =
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

export async function post(
  userData: userRegistration
): Promise<
  userFetchedData<({ jwtToken: string } & { currentUser: user }) | null, any>
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
