import cron from "node-cron";
import {
  clearUnregisteredAccounts,
  clearUnusedAccounts,
  resetMainDemoUser,
  warnUnusedAccounts,
} from "../utils/dbUtils/routineMaintenance";

export const initCronJobs = () => {
  // Clears users that have made an unverified account more than 2 weeks old
  // 3 AM on the first of every month
  cron.schedule("0 3 1 * *", clearUnregisteredAccounts);

  // Resets the Main Demo Account
  // 2 AM on the first of every month
  cron.schedule("0 2 1 * *", resetMainDemoUser);

  // Clears unused accounts that are more than 5 years old
  // 1 AM on the first of every month
  cron.schedule("0 1 1 * *", clearUnusedAccounts);

  // Sends warning emails to accounts that are within 2 weeks away from being deleted
  // 2 AM every Monday
  cron.schedule("0 2 * * 1", warnUnusedAccounts);
};
