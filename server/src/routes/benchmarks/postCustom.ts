import { Request, Response } from "express";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";
import { CustomBenchmark } from "./types";

export const postCustom = async (req: Request, res: Response) => {
  const incomingBenchmark = req.body as CustomBenchmark;
  const { id } = req.user as User;

  let { customBenchmark } = await db.Users.findOne({ where: { id } });

  incomingBenchmark.benchmarkTitle =
    incomingBenchmark.benchmarkTitle.toLowerCase();

  // If no benchmarks, we create the initial JSON field
  if (!customBenchmark) {
    const newBenchmark = {
      [incomingBenchmark.benchmarkTitle]: {
        ...incomingBenchmark,
      },
    };
    //@ts-ignore
    delete newBenchmark[incomingBenchmark.benchmarkTitle]["benchmarkTitle"];

    await db.Users.update(
      {
        customBenchmark: JSON.stringify(newBenchmark),
      },
      { where: { id } }
    );
  }
  // If customBenchmarks JSON field has data, we must append to it
  else {
    customBenchmark = JSON.parse(customBenchmark);
    customBenchmark[incomingBenchmark.benchmarkTitle] = {
      ...incomingBenchmark,
    };

    delete customBenchmark[incomingBenchmark.benchmarkTitle]["benchmarkTitle"];

    await db.Users.update(
      {
        customBenchmark: JSON.stringify(customBenchmark),
      },
      { where: { id } }
    );
  }

  return res.json({ message: "Custom benchmark posted." });
};
