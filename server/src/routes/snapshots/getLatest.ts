import { Request, Response } from "express";
import { Op } from "sequelize";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";
import { GetLatestAccumulator, SnapshotData } from "./types";

/*
 * Route: "/latest"
 * Inputs: None
 * Outputs: Provides all data related to the most recently submitted snapshot (just one),
 * including all its subtables (accounts, holdings) as json
 *
 * Snapshot = {
 *    Accounts: [{
 *          Holdings: [{}]
 *    }]
 * }
 * returns null if no snapshots exist
 */
export const getLatest = async (req: Request, res: Response) => {
  const { id } = req.user as User;

  console.log(id);

  // First find the latest specifiedDate
  const snapshot = await db.Snapshots.findOne({
    where: { userId: id },
    order: [["specifiedDate", "DESC"]],
    limit: 1,
  });

  if (!snapshot) {
    return res.json(snapshot);
  }

  // Since multiple snapshots can have the same date, we need to find them all and compare the createdAt field next
  const potentialSnapshots = await db.Snapshots.findAll({
    where: {
      [Op.and]: [{ userId: id }, { specifiedDate: snapshot.specifiedDate }],
    },
  });

  const latestSnapshotPointer = potentialSnapshots.reduce(
    (acc: GetLatestAccumulator, snapshot: SnapshotData) => {
      if (!acc) {
        acc = { id: snapshot.id, createdAt: snapshot.createdAt };
        return acc;
      }

      if (acc.createdAt < snapshot.createdAt) {
        acc = { id: snapshot.id, createdAt: snapshot.createdAt };
      }

      return acc;
    },
    undefined
  );

  const latestSnapshot = await db.Snapshots.findOne({
    where: { id: latestSnapshotPointer.id },
    include: {
      model: db.Accounts,
      include: {
        model: db.Holdings,
      },
    },
  });

  return res.json(latestSnapshot);
};
