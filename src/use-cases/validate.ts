declare global {
  type TMakeValidate = (userDB: TUserDB) => (user: TUser) => Promise<TUser>;
}

const makeValidate = (userDB: Promise<TUserDB>) => {
  const validate = (user: TUser) => {
    return new Promise<TUser>(async (resolve, reject) => {
      try {
        const userInstance = await userDB;

        await userInstance
          .findOneByEmail(user.email)
          .then(
            (found) =>
              found && reject("That email address is already registered")
          )
          .catch((err) => {
            /** this is expected to throw an error actually. Might need to refactor eventually, expecting it to throw an error is a pretty jank way to do this */
          });

        // TODO: I can validate names and stuff here I guess, but I can also do that on the front end
        // doing it on the frontend will remove needing to make a request to validate the user input

        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  };
  return validate;
};

export default makeValidate;
