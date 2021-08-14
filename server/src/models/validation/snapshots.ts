import Joi from "joi";
import { SnapshotAttributes } from "../snapshots";

export const validateSnapshot = (snapshot: SnapshotAttributes) => {
  const schema = Joi.object({
    title: Joi.string().max(30).required().trim(),
    benchmark: Joi.string().max(30).required().trim(),
    notes: Joi.string().max(255).trim().allow(null),
    specifiedDate: Joi.date().max("now").iso().required(),
    userId: Joi.number().greater(0),
  });

  return schema.validate(snapshot);
};
