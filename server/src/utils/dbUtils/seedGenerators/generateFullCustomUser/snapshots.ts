import { generateSpecifiedDates } from "../generateSnapshots";
import { SnapshotSeed } from "../types";

export const generateCustomSnapshots = (userId: number): SnapshotSeed[] => {
  const snapshots: SnapshotSeed[] = [];
  const specifiedDates = generateSpecifiedDates();
  specifiedDates.forEach((date) => {
    snapshots.push({
      title: `PP ${date.getMonth() + 1}/${date.getFullYear()}`,
      benchmark: "Permanent Portfolio",
      notes: "N/A",
      userId,
      specifiedDate: date,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  return snapshots;
};
