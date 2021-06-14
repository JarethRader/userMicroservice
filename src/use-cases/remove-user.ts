declare global {
  type TBuildRemoveUser = (userDB: Promise<TUserDB>) => TRemoveUser;
  type TRemoveUser = (id: string) => Promise<boolean>;
}

const buildRemoveUser: TBuildRemoveUser = (userDB) => {
  const removeUser: TRemoveUser = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userInstance = await userDB;
        await userInstance
          .remove(id)
          .then((success) => resolve(success))
          .catch((err) => reject(err));
      } catch (err) {
        reject(err);
      }
    });
  };
  return removeUser;
};

export default buildRemoveUser;
