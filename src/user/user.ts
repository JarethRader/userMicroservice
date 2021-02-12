/**
 * @Author Jareth Rader <jarethrader@gmail.com>
 * @Desc makes a user object
 *
 * @param Id
 * @param Email
 * @param hashPassword
 */

const buildMakeUser = (
  Id: {
    makeId: () => string;
    isValidId: (id: string) => boolean;
  },
  Email: {
    normalizeEmail: (email: string) => string;
    isValidEmail: (email: string) => boolean;
  },
  hashPassword: (password: string) => Promise<string>
) => {
  const makeUser: MakeUser = ({
    id = Id.makeId(),
    username,
    email,
    password,
    verified = false,
    createdOn = Date.now(),
    modifiedOn = Date.now(),
  }) => {
    // TODO add validations
    if (!Id.isValidId(id)) {
      throw new Error('Must have a valid id');
    }

    if (!username) {
      throw new Error('Must have a username');
    }
    if (username.length < 2) {
      throw new Error('Username must be longer than 2 characters');
    }
    if (!Email.isValidEmail(email as string)) {
      throw new Error('Must have a valid email address');
    }
    if (!password) {
      throw new Error('Must have a password');
    }
    if (password.length < 8) {
      throw new Error('Password must be longer than 8 charcters');
    }

    return Object.freeze({
      getId: () => id,
      getUsername: () => username,
      getEmail: () => Email.normalizeEmail(email as string),
      getPassword: async () => await hashPassword(password),
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
      getVerified: () => verified,
      verify: () => {
        verified = true;
      },
      toObject: () => {
        return {
          id,
          username,
          email,
          createdOn,
          modifiedOn,
          verified,
        };
      },
    });
  };

  return makeUser;
};

export default buildMakeUser;
