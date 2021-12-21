import { Request, Response } from "express";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";

export const getCustom = async (req: Request, res: Response) => {
  const { id } = req.user as User;
  const user = await db.Users.findOne({ where: { id } });
  return res.json({ customBenchmark: user.customBenchmark });
};
