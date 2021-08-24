import jwtStrategy from "./jwtStrategy";
import localStrategy from "./localStrategy";

export * from "./createToken";

export const passportAuthInit = () => {
  localStrategy();
  jwtStrategy();
};
