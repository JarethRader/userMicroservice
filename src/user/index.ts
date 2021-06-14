import Id from "../Id";
import Password from "../Password";
import argon from "argon2";
import buildMakeUser from "./user";

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const Email = Object.freeze({
  normalizeEmail: (email: string) => email.toLowerCase(),
  isValidEmail: (email: string) => emailRegexp.test(email),
});

const makeUser = buildMakeUser(Id, Email, Password);

export default makeUser;
