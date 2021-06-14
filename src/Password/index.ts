import argon2 from "argon2";

const Password = Object.freeze({
  hashPassword: (password: string) =>
    new Promise<string>(async (resolve, reject) =>
      resolve(await argon2.hash(password))
    ),
  validatePassword: (hashed: string, plain: string) =>
    new Promise<boolean>(async (resolve, reject) =>
      resolve(argon2.verify(hashed, plain))
    ),
});

export default Password;
