declare global {
  type TBuildAuthenticateCredentials = (
    userDB: Promise<TUserDB>,
    verifyPassword: (hased: string, plain: string) => Promise<boolean>
  ) => TAuthenticateCredentials;

  type TAuthenticateCredentials = (
    email: string,
    password: string
  ) => Promise<string>;
}

const buildAuthenticateCredentials: TBuildAuthenticateCredentials = (
  userDB,
  verifyPassword
) => {
  const authenticateCredentials: TAuthenticateCredentials = (
    email,
    password
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userInstance = await userDB;

        const user = await userInstance
          .findOneByEmail(email)
          .then((user) => user)
          .catch((err) => reject(err));

        // @ts-ignore
        await verifyPassword(user.password, password)
          .then((success) => {
            success && user && resolve(user._id);
            reject("Password was incorrect");
          })
          .catch((err) => reject("Failed to authentiate user"));
      } catch (err) {
        reject(err);
      }
    });
  };
  return authenticateCredentials;
};

export default buildAuthenticateCredentials;
