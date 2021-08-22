import { Op } from "sequelize";
import db from "../../../models";

// Clears users that have made an unverified account more than 2 weeks old
export const clearUnregisteredAccounts = (): Promise<void> => {
  return new Promise(async (res, rej) => {
    const currentTime = new Date();
    currentTime.setDate(currentTime.getDate() - 15);

    try {
      const users = await db.Users.destroy({
        where: {
          [Op.and]: [
            { confirmed: false },
            { createdAt: { [Op.lte]: currentTime } },
          ],
        },
      });
      console.log(users);
      res();
    } catch (err) {
      console.log(err);
      rej(err);
    }
  });
};

// Clears unused accounts that are more than 5 years old
export const clearUnusedAccounts = (): Promise<void> => {
  return new Promise(async (res, rej) => {
    const currentTime = new Date();
    currentTime.setFullYear(currentTime.getFullYear() - 5);

    try {
      const users = await db.Users.destroy({
        where: {
          lastLoggedIn: { [Op.lte]: currentTime },
        },
      });

      console.log(users);
      res();
    } catch (err) {
      console.log(err);
      rej(err);
    }
  });
};
