declare global {
  type TBuildLoginUser = (
    authenticate: TAuthenticateCredentials,
    findUser: TFindUser
  ) => (request: ExpressHttpRequest) => Promise<IController>;
}

const buildLoginUser: TBuildLoginUser = (authenticate, findUser) => {
  const loginUser = async (request: ExpressHttpRequest) => {
    try {
      const user = await authenticate(request.body.email, request.body.password)
        .then(async (userID) => await findUser(userID))
        .catch((err) => {
          throw err;
        });

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: user,
      };
    } catch (err) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: err.message,
        },
      };
    }
  };
  return loginUser;
};

export default buildLoginUser;
