import { IUserModel } from "../db";

declare global {
  type TUserDB = Readonly<{
    insert: (newUserInfo: TUser) => Promise<IUserModel>;
    update: (id: string, updateUserInfo: TUpdate) => Promise<IUserModel>;
    remove: (id: string) => Promise<boolean>;
    findOneByEmail: (email: string) => Promise<IUserModel>;
    findOneByID: (id: string) => Promise<IUserModel>;
  }>;

  type TMakeUserDB = (userSchema: TUserModel) => TUserDB;
}

// Define User DB Methods
const makeUserDB: TMakeUserDB = (userSchema) => {
  return Object.freeze({
    insert: (newUserInfo) => {
      return new Promise(async (resolve, reject) => {
        const newUser = new userSchema(newUserInfo);
        await newUser
          .save()
          .then((user) => {
            if (!user) reject("Error saving new user");
            resolve(user);
          })
          .catch((err) => {
            console.error(err);
            reject("Failed to create new user");
          });
      });
    },
    update: (id, updateUserInfo) => {
      return new Promise(async (resolve, reject) => {
        await userSchema
          .findOneAndUpdate({ _id: id }, { ...updateUserInfo }, { new: true })
          .then((user) => {
            if (!user) reject("Error updating user");
            resolve(user!);
          })
          .catch((err) => reject("Failed to update user"));
      });
    },
    remove: (id) => {
      return new Promise(async (resolve, reject) => {
        await userSchema
          .findOneAndDelete({ _id: id })
          .then((user) => {
            if (!user) reject("Error removing user");
            resolve(true);
          })
          .catch((err) => reject("Failed to remove user"));
      });
    },
    findOneByEmail: (email) => {
      return new Promise(async (resolve, reject) => {
        await userSchema
          .findOne({ email })
          .then((user) => {
            if (!user) reject("Error finding user");
            resolve(user!);
          })
          .catch((err) => reject("Failed to find user"));
      });
    },
    findOneByID: (id) => {
      return new Promise(async (resolve, reject) => {
        await userSchema
          .findById(id)
          .then((user) => {
            if (!user) reject("Error finding user");
            const formatUser = {
              ...user!.toObject(),
              _id: (user?._id).toString(),
            };
            // @ts-ignore
            resolve(formatUser!);
          })
          .catch((err) => reject("Failed to find user"));
      });
    },
  });
};

export default makeUserDB;
