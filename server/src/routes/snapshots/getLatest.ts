import { Request, Response } from "express";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";

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
  try {
    const snapshot = await db.Snapshots.findOne({
      where: { userId: id },
      include: {
        model: db.Accounts,
        include: {
          model: db.Holdings,
        },
      },
      order: [["specifiedDate", "DESC"]],
      limit: 1,
    });
    res.json(snapshot);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error - could not process request." });
  }
};
