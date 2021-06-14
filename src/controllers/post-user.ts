const buildPostUser = (addUser: TAddUser) => {
  const postUser = async (request: ExpressHttpRequest) => {
    try {
      const user = await addUser({ ...request.body })
        .then((newUser) => newUser)
        .catch((err) => {
          throw err;
        });

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
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
  return postUser;
};

export default buildPostUser;
