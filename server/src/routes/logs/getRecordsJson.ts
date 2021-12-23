import { Request, Response } from "express";
import { Op } from "sequelize";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";
import { SnapshotRecord } from "../../models/validation/types";

export const getRecordsJson = async (req: Request, res: Response) => {
  const { id } = req.user as User;
  const { years } = req.params;
  let startDate = new Date();

  startDate.setMonth(
    new Date().getMonth() - parseInt(years !== "0" ? years : "999") * 12
  );

  const snapshots: SnapshotRecord[] = await db.Snapshots.findAll({
    where: { userId: id, specifiedDate: { [Op.gte]: startDate } },
    include: {
      model: db.Accounts,
      include: {
        model: db.Holdings,
      },
    },
    order: [["specifiedDate", "DESC"]],
  });

  res.json({ data: snapshots });
};
