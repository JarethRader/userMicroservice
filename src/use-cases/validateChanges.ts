const makeValidate: MakeEditValidate = (userDb, toObjectId) => {
  const validate: IEditValidate = async (userInfo: IEditUser) => {
    const userInstance = await userDb();
    let validatedInfo: {
      [key: string]: any;
    } = {};

    if (userInfo.id) {
      validatedInfo['_id'] = toObjectId(userInfo.id);
    }

    if (userInfo.email) {
      userInstance &&
        userInstance
          .findOneByEmail(userInfo.getEmail())
          .then((foundUser) => {
            if (foundUser && foundUser.id !== userInfo.getId()) {
              throw new Error(
                'That email  is already registered under another account'
              );
            }
            validatedInfo['email'] = userInfo.email;
          })
          .catch((err) => {
            throw err;
          });
    }

    if (userInfo.username) {
      // userInstance &&
      //   (await userInstance
      //     .findOne({ username: userInfo.username })
      //     .then((foundUser) => {
      //       if (foundUser) {
      //         throw new Error('That username has been taken');
      //       }
      //     })
      //     .catch((err) => {
      //       throw err;
      //     }));
      validatedInfo['username'] = userInfo.username;
    }

    if (userInfo.password) {
      validatedInfo['password'] = userInfo.password;
    }

    return validatedInfo;
  };
  return validate;
};

export default makeValidate;
