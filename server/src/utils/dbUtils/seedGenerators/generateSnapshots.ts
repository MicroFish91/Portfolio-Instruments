import { PORTFOLIO_BENCHMARKS } from "../../../constants";
import { SNAPSHOTS_PER_USER } from "./constants";
import {
  DeleteNote,
  SnapshotSeed,
  SnapshotSeedGenerator,
  SpecifiedDates,
} from "./types";

export function generateSpecifiedDates() {
  const dates: Date[] = [];

  for (let index = SNAPSHOTS_PER_USER - 1; index >= 0; index--) {
    const date: Date = new Date();
    date.setDate(date.getDate() - 1);
    const dateInterval = Math.floor(48 / SNAPSHOTS_PER_USER); // # of snapshots per 4 years period
    date.setMonth(date.getMonth() - dateInterval * index);
    dates.push(date);
  }

  return dates;
}

/*
 * Generates (n = SNAPSHOTS_PER_USER) snapshot seeds for each seed user
 * The last snapshot made for each user (i.e. the most recent snapshot) will always match
 * the user's currently set benchmark
 * The deleteNote is the text we will use to reverse the seeding (via the down() method)
 * (i.e. delete... {where: { notes = deleteNote })  )
 */
export function generateSnapshots() {
  const deleteNote: DeleteNote = "THIS IS DUMMY DATA FOR TESTING";
  const specifiedDates: SpecifiedDates = generateSpecifiedDates();
  const snapshotSeedGenerator: SnapshotSeedGenerator = {
    up: [],
    down: deleteNote,
  };

  // # of users = length of PORTFOLIO_BENCHMARKS
  PORTFOLIO_BENCHMARKS.forEach((benchmark, userIndex) => {
    for (
      let snapshotIndex = 0;
      snapshotIndex < SNAPSHOTS_PER_USER;
      snapshotIndex++
    ) {
      // Always ensures that the last posted snapshot matches the user's current benchmark
      if (snapshotIndex === SNAPSHOTS_PER_USER - 1) {
        snapshotSeedGenerator.up.push({
          title: `Snapshot Title #${snapshotIndex + 1}`,
          benchmark,
          notes: deleteNote,
          specifiedDate: specifiedDates[snapshotIndex],
          userId: userIndex + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as SnapshotSeed);
      } else {
        snapshotSeedGenerator.up.push({
          title: `Snapshot Title #${snapshotIndex + 1}`,
          benchmark:
            PORTFOLIO_BENCHMARKS[
              Math.floor(Math.random() * (PORTFOLIO_BENCHMARKS.length - 1))
            ],
          notes: deleteNote,
          specifiedDate: specifiedDates[snapshotIndex],
          userId: userIndex + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as SnapshotSeed);
      }
    }
  });

  return snapshotSeedGenerator;
}
