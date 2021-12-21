import { Request, Response } from "express";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";

export const removeFromCustom = async (req: Request, res: Response) => {
  const { id } = req.user as User;
  let { customBenchmark } = await db.Users.findOne({ where: { id } });
  let { benchmark } = req.body;

  benchmark = benchmark.toLowerCase();

  if (customBenchmark) {
    customBenchmark = JSON.parse(customBenchmark);

    if (customBenchmark[benchmark]) {
      delete customBenchmark[benchmark];
    }

    // If we deleted the last object key, set field to null
    if (!Object.keys(customBenchmark).length) {
      customBenchmark = null;
    } else {
      customBenchmark = JSON.stringify(customBenchmark);
    }
  }

  await db.Users.update({ customBenchmark }, { where: { id } });
  return res.json({ customBenchmark });
};
