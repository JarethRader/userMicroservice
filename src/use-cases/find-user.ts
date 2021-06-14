import { IUserModel } from "../db";

declare global {
  type TBuildFindUser = (userDB: Promise<TUserDB>) => TFindUser;
  type TFindUser = (id: string) => Promise<IUserModel>;
}

const buildFindUser: TBuildFindUser = (userDB) => {
  const findUser: TFindUser = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userInstance = await userDB;
        await userInstance
          .findOneByID(id)
          .then((user) => resolve(user))
          .catch((err) => reject(err));
      } catch (err) {
        reject(err);
      }
    });
  };
  return findUser;
};

export default buildFindUser;
