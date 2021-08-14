import Joi from "joi";
import { HoldingAttributes } from "../holdings";

export const validateHolding = (holding: HoldingAttributes) => {
  const schema = Joi.object({
    title: Joi.string().max(50).required(),
    ticker: Joi.string().max(10).required(),
    category: Joi.string().max(20).required(),
    expenseRatio: Joi.number().min(0).max(1).required(),
    total: Joi.number().required(),
    accountId: Joi.number().greater(0).required(),
  });

  return schema.validate(holding);
};
