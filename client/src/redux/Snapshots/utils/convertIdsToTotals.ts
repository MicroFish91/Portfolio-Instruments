import { ReducedSnapshot } from "../types";

type ConvertIdsToTotals = (
  snapshotsById: { [id: string]: ReducedSnapshot },
  idsPerMonth: number[]
) => number[];

// Populates all spaces with dollar values and removes intermediate zeroes
export const convertIdsToTotals: ConvertIdsToTotals = (
  snapshotsById,
  snapshotIdsPerMonth
) => {
  const totalsPerMonth = [...snapshotIdsPerMonth];
  let placeholder: number = snapshotsById[snapshotIdsPerMonth[0]]
    ? snapshotsById[snapshotIdsPerMonth[0]].total
    : 0;

  totalsPerMonth.forEach((snapshotId, index) => {
    if (snapshotId !== 0) {
      placeholder = snapshotsById[snapshotId].total;
    }
    totalsPerMonth[index] = placeholder;
  });

  return totalsPerMonth;
};
