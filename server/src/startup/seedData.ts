import logger from "../logger";
import { formatLogError } from "../logger/formatLogError";
import { setMainDemoUser } from "../utils/dbUtils/routineMaintenance";

export const initSeedData = async () => {
  try {
    await setMainDemoUser();
  } catch (err) {
    logger.error(formatLogError(err, "StartupSeedData"));
  }
};
