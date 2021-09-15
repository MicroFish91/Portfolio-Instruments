import { monthDifference } from "../../../utils";
import { ReducedSnapshot } from "../types";

type ConsolidateSnapshotsMonthlyById = (
  snapshotsById: { [id: string]: ReducedSnapshot },
  snapshotsList: string[],
  monthsBeforeNow?: number
) => number[];

// Consolidates only the most recent snapshot per month (will not display more than 1 snapshot per month)
export const consolidateSnapshotsMonthlyById: ConsolidateSnapshotsMonthlyById =
  (snapshotsById, snapshotsList, monthsBeforeNow = 0) => {
    const startDate = new Date();
    const valuesByMonth = new Array(24).fill(0);
    let carryOverId: string | number = 0;

    startDate.setMonth(startDate.getMonth() - monthsBeforeNow);

    snapshotsList.forEach((snapshotId: string) => {
      const snapshot = snapshotsById[snapshotId];
      const snapshotDate = new Date(snapshot.date);
      const monthsBefore = monthDifference(snapshotDate, startDate);

      if (monthsBefore >= 0 && monthsBefore < 24) {
        const valuesByMonthIndex =
          23 -
          (startDate.getFullYear() - snapshotDate.getFullYear()) * 12 -
          (startDate.getMonth() - snapshotDate.getMonth());

        if (valuesByMonth[valuesByMonthIndex] === 0) {
          valuesByMonth[valuesByMonthIndex] = snapshotId;
        }
      } else if (!carryOverId) {
        carryOverId = snapshotId;
      }
    });

    // Checks to see if we need to carryover data from the previous 2 years
    if (monthsBeforeNow === 0 && valuesByMonth[0] === 0) {
      valuesByMonth[0] = carryOverId;
    }

    return valuesByMonth;
  };
