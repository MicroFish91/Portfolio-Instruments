import axios from "axios";
import { API_ROUTES } from "../constants";
import { fetchedData, user } from "../types";

export async function post(
  userData: user
): Promise<
  fetchedData<({ jwtToken: string } & { currentUser: user }) | null, any>
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
    console.log("my error: ", error.response.status);
    return {
      data: null,
      error: {
        status: error.response.status,
        message: error.response.data.message,
      },
    };
  }
}
