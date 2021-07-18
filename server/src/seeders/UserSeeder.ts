"use strict";
import db from "../models";
import { generateUsers } from "../seedGenerators";

interface UserSeeder {
  up: () => void;
  down: () => void;
}

export const UserSeeder: UserSeeder = {
  up: () => {
    generateUsers().up.forEach((user) => {
      db.Users.create(user);
    });
  },
  down: () => {
    generateUsers().down.forEach((user) => {
      db.Users.destroy({
        where: {
          email: user,
        },
      });
    });
  },
};
