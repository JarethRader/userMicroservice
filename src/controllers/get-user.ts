const buildGetUser = (findUser: TFindUser) => {
  const getUser = async (request: ExpressHttpRequest) => {
    try {
      const user = await findUser(request.params.id)
        .then((updatedUser) => updatedUser)
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
  return getUser;
};

export default buildGetUser;
