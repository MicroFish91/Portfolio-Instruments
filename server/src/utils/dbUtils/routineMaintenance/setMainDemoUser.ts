import { deleteAccount } from "./deleteAccount";
import { seedFullCustomUser } from "./FullCustomUserSeed";
import { shouldCustomUserUpdate } from "./shouldCustomUserUpdate";

// Resets the Main Demo Account
export const resetMainDemoUser = (): Promise<void> => {
  return new Promise(async (res, rej) => {
    try {
      const shouldUpdate = await shouldCustomUserUpdate();
      if (shouldUpdate) {
        await deleteAccount("hello_world@gmail.com");
        await seedFullCustomUser();
      }
      res();
    } catch (err) {
      rej(err);
    }
  });
};

export const setMainDemoUser = (): Promise<void> => {
  return new Promise(async (res, rej) => {
    try {
      const shouldUpdate = await shouldCustomUserUpdate();
      if (shouldUpdate) {
        await seedFullCustomUser();
      }
      res();
    } catch (err) {
      rej(err);
    }
  });
};
