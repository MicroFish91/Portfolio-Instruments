import bcrypt from "bcryptjs";
import { UserSeed } from "../types";

export const generateCustomUser = (): Promise<UserSeed> => {
  return new Promise(async (res, _rej) => {
    const user: UserSeed = {
      email: "hello_world@gmail.com",
      password: await bcrypt.hashSync("1234", 8),
      firstName: "Harry",
      lastName: "Browne",
      benchmark: "Permanent Portfolio",
      confirmed: true,
      rebalanceThreshold: 10,
      vpThreshold: 10,
      lastLoggedIn: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    res(user);
  });
};
