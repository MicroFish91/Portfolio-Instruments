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

export const validatePassword = (password: string) => {
  const schema = Joi.object({
    password: passwordComplexity({
      min: 5,
      max: 255,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      requirementCount: 4,
    }),
  });

  return schema.validate({ password });
};

export const validateNotifications = (
  rebalanceThreshold: number,
  vpThreshold: number
) => {
  const schema = Joi.object({
    rebalanceThreshold: Joi.number().integer().min(0).max(50).required(),
    vpThreshold: Joi.number().integer().min(0).max(90).required(),
  });

  return schema.validate({ rebalanceThreshold, vpThreshold });
};
