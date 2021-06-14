// TODO: Add type definitions
import { IUserModel } from "../db";
import makeUser from "../user";

declare global {
  type TBuildEditUser = (
    userDB: Promise<TUserDB>,
    validate: (user: TUser) => Promise<TUser>
  ) => (id: string, updatedUserInfo: IUpdate) => Promise<IUserModel>;

  type TEditUser = (
    id: string,
    updatedUserInfo: IUpdate
  ) => Promise<IUserModel>;
}

const buildEditUser: TBuildEditUser = (
  userDB: Promise<TUserDB>,
  validate: (user: TUser) => Promise<TUser>
) => {
  const editUser: TEditUser = (id, updatedUserInfo) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userInstance = await userDB;
        const user = await userInstance
          .findOneByID(id)
          .then((user) => user)
          .catch((err) => reject(err));

        const updatedInfo = {
          ...user,
          ...updatedUserInfo,
        };

        const updatedUser = await makeUser(updatedInfo as TUser);
        // const validatedUser = await validate(updatedUser.toObject());

        userInstance
          .update(id, updatedUser.toObject() as TUser)
          .then((newUser) => resolve(newUser))
          .catch((err: Error) => reject(err));
      } catch (err) {
        reject(err);
      }
    });
  };
  return editUser;
};

export default buildEditUser;
