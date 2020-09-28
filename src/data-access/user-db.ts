const makeUserDb: MakeDB = (userSchema) =>
  Object.freeze({
    insert: async (userInfo: any) => {
      const newUser: IUserModel = new userSchema({
        _id: userInfo.id || userInfo._id,
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
        verified: userInfo.verified,
        createdAt: userInfo.createdOn || userInfo.createdAt,
        updatedAt: userInfo.modifiedOn || userInfo.updatedAt,
      });
      return await newUser.save().then((user) => {
        return user && user;
      });
    },
    findOneByEmail: async (email: string) => {
      return new Promise<IUserModel | undefined>(async (resolve, reject) => {
        await userSchema
          .findOne({ email })
          .then((user: IUserModel) => {
            if (!user) {
              resolve(undefined);
            }
            resolve(user);
          })
          .catch((err: any) => {
            reject(err);
          });
      });
    },
    findOneById: async (id: string) => {
      return await userSchema
        .findById(id)
        .then((user: IUserModel) => {
          if (!user) {
            return undefined;
          }
          return user;
        })
        .catch((err: any) => {
          throw err;
        });
    },
    remove: async (id: string) => {
      return await userSchema
        .findOneAndDelete({ _id: id })
        .catch((err: any) => {
          throw err;
        });
    },
    update: async (id: string, updatedInfo: IEditUser) => {
      return await userSchema
        .findOneAndUpdate({ _id: id }, { ...updatedInfo }, { new: true })
        .then((user: IUserModel) => {
          if (!user) {
            throw new Error('Failed to updated User');
          }
          return user;
        });
    },
  });

export default makeUserDb;
