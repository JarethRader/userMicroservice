const buildAuthenticateCredentials = (
  userDb: () => Promise<UserDB>,
  Authenticate: {
    validatePassword(
      givenPassword: string,
      storedPassword: string
    ): Promise<boolean>;
  }
) => {
  const authenticateCredentials = async (email: string, password: string) => {
    return new Promise<string | undefined>(async (resolve, reject) => {
      const db = await userDb();
      const user = await db.findOneByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      const isValid = await Authenticate.validatePassword(
        password,
        user.password
      );
      isValid && resolve(user.id);
      resolve(undefined);
    });
  };

  return authenticateCredentials;
};

export default buildAuthenticateCredentials;
