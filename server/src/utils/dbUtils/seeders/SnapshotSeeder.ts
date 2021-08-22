import db from "../../../models";
import { generateSnapshots } from "../seedGenerators";

interface SnapshotSeeder {
  up: () => Promise<void>;
  down: () => Promise<void>;
}

export const SnapshotSeeder: SnapshotSeeder = {
  up: () => {
    return new Promise((res, rej) => {
      try {
        generateSnapshots().up.forEach(async (snapshot) => {
          await db.Snapshots.create(snapshot);
        });
        res();
      } catch (err) {
        rej(err);
      }
    });
  },
  down: () => {
    return new Promise(async (res, rej) => {
      try {
        // Remove all snapshots that have the ${deleteNotes} text (see generateSnapshots)
        const deleteClause = generateSnapshots().down;
        await db.Snapshots.destroy({
          where: {
            notes: deleteClause,
          },
        });
        res();
      } catch (err) {
        rej(err);
      }
    });
  },
};
