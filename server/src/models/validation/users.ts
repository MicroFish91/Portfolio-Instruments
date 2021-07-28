import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import { UserAttributes } from "../users";

export const validateUser = (user: UserAttributes) => {
  const schema = Joi.object({
    email: Joi.string().email().min(8).max(45).required(),
    password: passwordComplexity({
      min: 5,
      max: 255,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      requirementCount: 4,
    }),
    firstName: Joi.string()
      .pattern(/^[a-zA-Z]*$/)
      .min(2)
      .max(20)
      .required(),
    lastName: Joi.string()
      .pattern(/^[a-zA-Z]*$/)
      .min(2)
      .max(20)
      .required(),
  });

  return schema.validate(user);
};