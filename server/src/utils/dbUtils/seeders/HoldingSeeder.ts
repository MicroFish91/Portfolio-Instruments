import db from "../../../models";
import { generateHoldings } from "../seedGenerators";

interface HoldingSeeder {
  up: () => Promise<void>;
  down: () => Promise<void>;
}

export const HoldingSeeder: HoldingSeeder = {
  up: () => {
    return new Promise((res, rej) => {
      try {
        generateHoldings().up.forEach(async (holding) => {
          await db.Holdings.create(holding);
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
        // Remove all holdings that have the ${deleteTitle} text (see generateHoldings)
        generateHoldings().down.forEach(async (holdingTitle) => {
          await db.Holdings.destroy({
            where: {
              title: holdingTitle,
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
