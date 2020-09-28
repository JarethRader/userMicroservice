import * as argon2 from 'argon2';
import Id from '../Id';
import buildMakeUser from './user';

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const Email = Object({
  normalizeEmail: (email: string) => email.toLowerCase(),
  isValidEmail: (email: string) => emailRegexp.test(email),
});

const Password = async (password: string) => await argon2.hash(password);

const makeUser = buildMakeUser(Id, Email, Password);

export default makeUser;
