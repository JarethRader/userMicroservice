// TODO: Add type definitions
import { rejects } from "assert/strict";
import { IUserModel } from "../db";
import makeUser from "../user";

declare global {
  type TBuildAddUser = (
    userDB: Promise<TUserDB>,
    validate: (user: TUser) => Promise<TUser>
  ) => TAddUser;

  type TAddUser = (newUserInfo: TUser) => Promise<IUserModel>;
}

const buildAddUser: TBuildAddUser = (userDB, validate) => {
  const addUser: TAddUser = (newUserInfo) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userInstance = await userDB;

        const user = await makeUser(newUserInfo);
        const validatedUser = await validate(user.toObject())
          .then((validated) => validated)
          .catch((err) => reject(err));

        await userInstance
          .insert(validatedUser as TUser)
          .then((newUser) => resolve(newUser))
          .catch((err) => reject(err));
      } catch (err) {
        reject(err);
      }
    });
  };
  return addUser;
};

export default buildAddUser;
