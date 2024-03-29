import bcrypt from "bcryptjs";
import { PORTFOLIO_BENCHMARKS } from "../../../constants";
import { UserSeed, UserSeedGenerator } from "./types";

/*
 * Generates a fake user seed for each of the benchmarks available with
 * email: user[x]@gmail.com
 * password: 1234
 */
export function generateUsers() {
  const userSeedGenerator: UserSeedGenerator = {
    up: [],
    down: [],
  };

  PORTFOLIO_BENCHMARKS.forEach((benchmark, index) => {
    userSeedGenerator.up.push({
      email: `user${index + 1}@gmail.com`,
      password: bcrypt.hashSync("1234", 8),
      firstName: `User${index + 1}`,
      lastName: `Tester`,
      benchmark: benchmark,
      confirmed: true,
      rebalanceThreshold: 10,
      vpThreshold: 0,
      lastLoggedIn: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as UserSeed);
    userSeedGenerator.down.push(`user${index + 1}@gmail.com`);
  });

  return userSeedGenerator;
}
