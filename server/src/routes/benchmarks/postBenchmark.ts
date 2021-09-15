import { Request, Response } from "express";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";

export const postBenchmark = async (req: Request, res: Response) => {
  const { id } = req.user as User;
  await db.Users.update({ benchmark: req.body.benchmark }, { where: { id } });
  return res.json({ message: "Benchmark posted." });
};
