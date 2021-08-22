import jwtStrategy from "./jwtStrategy";
import localStrategy from "./localStrategy";

export * from "./createToken";
export * from "./middleware";

export const passportAuthInit = () => {
  localStrategy();
  jwtStrategy();
};
