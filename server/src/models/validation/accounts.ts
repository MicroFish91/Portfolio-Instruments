import Joi from "joi";
import { AccountAttributes } from "../accounts";

export const validateAccount = (account: AccountAttributes) => {
  const schema = Joi.object({
    location: Joi.string().max(40).required(),
    type: Joi.string().max(15).required(),
    snapshotId: Joi.number().greater(0).required(),
  });

  return schema.validate(account);
};
