import bcrypt from "bcryptjs";
import { UserSeed } from "../types";
import CUSTOM_BENCHMARK from "./customBenchmark.json";

export const generateCustomUser = (): Promise<UserSeed> => {
  return new Promise(async (res, _rej) => {
    const user: UserSeed = {
      email: "hello_world@gmail.com",
      password: await bcrypt.hashSync("1234", 8),
      firstName: "Harry",
      lastName: "Browne",
      benchmark: "Permanent Portfolio",
      confirmed: true,
      customBenchmark: JSON.stringify(CUSTOM_BENCHMARK),
      rebalanceThreshold: 10,
      vpThreshold: 10,
      lastLoggedIn: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    res(user);
  });
};
