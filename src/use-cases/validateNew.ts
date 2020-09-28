const makeValidate: MakeUserValidate = (userDb, toObjectId) => {
  const validate: IUserValidate = async (user: IUserObject) => {
    const userInstance = await userDb();

    userInstance
      .findOneByEmail(user.getEmail())
      .then((foundUser) => {
        if (foundUser && foundUser.id !== user.getId()) {
          throw new Error(
            'That email address is already registered under another account'
          );
        }
      })
      .catch((err) => {
        throw err;
      });

    return {
      _id: toObjectId(user.getId()),
      username: user.getUsername(),
      email: user.getEmail(),
      password: await user.getPassword(),
      verified: user.getVerified(),
      createdAt: user.getCreatedOn(),
      updatedAt: user.getModifiedOn(),
    };
  };
  return validate;
};

export default makeValidate;
