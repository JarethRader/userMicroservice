declare global {
  interface IUpdate {
    _id?: string;
    username?: string;
    email?: string;
    password?: string;
    createdAt?: number;
    updatedAt?: number;
  }
  type TUpdate = IUpdate;

  interface IMakeUser extends IUpdate {
    _id: string;
    username: string;
    email: string;
  }
  type TUser = IMakeUser;

  type TMakeUser = Readonly<{
    getId: () => string;
    getUsername: () => string;
    getEmail: () => string;
    getPassword: () => string;
    toObject: () => {
      _id: string;
      username: string;
      email: string;
      password: string;
      createdAt: number;
      updatedAt: number;
    };
  }>;
}

const buildMakeUser = (
  Id: {
    makeID: () => string;
    isValidId: (id: string) => boolean;
  },
  Email: {
    normalizeEmail: (email: string) => string;
    isValidEmail: (email: string) => boolean;
  },
  Password: {
    hashPassword: (password: string) => Promise<string>;
  }
) => {
  const makeUser = async ({
    _id = Id.makeID(),
    username,
    email,
    password,
    createdAt = Date.now(),
    updatedAt = Date.now(),
  }: TUser) => {
    return new Promise<TMakeUser>(async (resolve, reject) => {
      // Validate data
      if (!Id.isValidId(_id)) reject("Must have a valid id");
      if (!username) reject("Must have a username");
      if (!Email.isValidEmail(email)) reject("Must have a valid email");

      const hashed = await Password.hashPassword(password!).then(
        (password) => password
      );

      resolve(
        Object.freeze({
          getId: () => _id,
          getUsername: () => username,
          getEmail: () => Email.normalizeEmail(email),
          getPassword: () => hashed,
          toObject: () => ({
            _id,
            username,
            email,
            password: hashed,
            createdAt,
            updatedAt,
          }),
        })
      );
    });
  };

  return makeUser;
};

export default buildMakeUser;
