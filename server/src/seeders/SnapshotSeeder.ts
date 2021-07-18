import db from "../models";
import { generateSnapshots } from "../seedGenerators";

interface SnapshotSeeder {
  up: () => void;
  down: () => void;
}

export const SnapshotSeeder: SnapshotSeeder = {
  up: () => {
    generateSnapshots().up.forEach((snapshot) => {
      db.Snapshots.create(snapshot);
    });
  },
  down: () => {
    // Remove all snapshots that have the ${deleteNotes} text (see generateSnapshots)
    const deleteClause = generateSnapshots().down;
    db.Snapshots.destroy({
      where: {
        notes: deleteClause,
      },
    });
  },
};
