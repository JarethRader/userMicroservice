const buildLoginUser = (
  authenticate: (
    email: string,
    password: string
  ) => Promise<string | undefined>,
  listUser: (id: string) => Promise<IUserModel | undefined>
) => {
  const LoginUser = async (
    request: ExpressHttpRequest
  ): Promise<IController> => {
    try {
      // validPassword will be the userID if passwords match, and undefined if passwords don't match
      const validPassword = await authenticate(
        request.body.email,
        request.body.password
      );
      if (!validPassword) {
        throw new Error('Invalid password');
      }
      const user =
        validPassword !== undefined ? await listUser(validPassword) : undefined;

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: { user },
        session: {
          userID: validPassword,
        },
      };
    } catch (err) {
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          error: err.message,
        },
        session: {
          destroy: true,
        },
      };
    }
  };

  return LoginUser;
};

export default buildLoginUser;
