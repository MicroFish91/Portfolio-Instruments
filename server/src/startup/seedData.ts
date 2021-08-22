import { setMainDemoUser } from "../utils/dbUtils/routineMaintenance";

export const initSeedData = async () => {
  try {
    await setMainDemoUser();
  } catch (err) {
    console.log(err);
  }
};
