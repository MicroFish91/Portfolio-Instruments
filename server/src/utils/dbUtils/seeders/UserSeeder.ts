import db from "../../../models";
import { generateUsers } from "../seedGenerators";

interface UserSeeder {
  up: () => Promise<void>;
  down: () => Promise<void>;
}

export const UserSeeder: UserSeeder = {
  up: () => {
    return new Promise((res, rej) => {
      try {
        generateUsers().up.forEach(async (user) => {
          await db.Users.create(user);
        });
        res();
      } catch (err) {
        rej(err);
      }
    });
  },
  down: () => {
    return new Promise((res, rej) => {
      try {
        generateUsers().down.forEach(async (user) => {
          await db.Users.destroy({
            where: {
              email: user,
            },
          });
        });
        res();
      } catch (err) {
        rej(err);
      }
    });
  },
};
