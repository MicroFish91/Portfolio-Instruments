import { Request, Response } from "express";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";
import { CustomBenchmark } from "./types";

export const postCustom = async (req: Request, res: Response) => {
  const newBenchmark = req.body as CustomBenchmark;
  const { id } = req.user as User;

  let { customBenchmark } = await db.Users.findOne({ where: { id } });

  newBenchmark.benchmarkTitle = newBenchmark.benchmarkTitle.toLowerCase();

  // If no benchmarks, we create the initial JSON field
  if (!customBenchmark) {
    await db.Users.update(
      {
        customBenchmark: JSON.stringify({
          [newBenchmark.benchmarkTitle]: {
            assetCategories: newBenchmark.assetCategories,
            assetPercentages: newBenchmark.assetPercentages,
          },
        }),
      },
      { where: { id } }
    );
  }
  // If customBenchmarks JSON field has data, we must append to it
  else {
    customBenchmark = JSON.parse(customBenchmark);
    customBenchmark[newBenchmark.benchmarkTitle] = {
      assetCategories: newBenchmark.assetCategories,
      assetPercentages: newBenchmark.assetPercentages,
    };

    await db.Users.update(
      {
        customBenchmark: JSON.stringify(customBenchmark),
      },
      { where: { id } }
    );
  }

  return res.json({ message: "Custom benchmark posted." });
};
