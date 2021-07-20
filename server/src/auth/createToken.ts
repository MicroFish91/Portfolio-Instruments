import jwt from "jwt-simple";
import { secrets } from "../config";
import { UserAttributes as User } from "../models/users";

export const createToken = (user: User): string => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secrets.JWT_SECRET);
};
