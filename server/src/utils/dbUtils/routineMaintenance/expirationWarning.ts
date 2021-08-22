import { Op } from "sequelize";
import { sendEmail } from "../..";
import db from "../../../models";
import { UserAttributes } from "../../../models/users";

// Sends warning emails to accounts that are within 2 weeks away from being deleted
export const warnUnusedAccounts = (): Promise<void> => {
  return new Promise(async (res, rej) => {
    const currentTime = new Date();
    currentTime.setFullYear(currentTime.getFullYear() - 5);
    currentTime.setDate(currentTime.getDate() + 14);

    try {
      const users = await db.Users.findAll({
        where: { lastLoggedIn: { [Op.lte]: currentTime } },
      });

      users?.forEach(async (user: UserAttributes) => {
        await sendEmail(
          user.email,
          "Portfolio Instruments - Account Expiration",
          `Your account ${user.email} is set to expire soon.
          If you would like to prevent this from happening,
          simply login to your account to prevent our automated
          clearing system.  Thank you!`
        );
      });

      res();
    } catch (err) {
      console.log(err);
      rej();
    }
  });
};
