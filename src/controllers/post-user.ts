const buildPostUser: BuildPostUser = (addUser) => {
  const postUser = async (
    request: ExpressHttpRequest
  ): Promise<IController> => {
    try {
      const newUser = await addUser({ ...request.body });
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: { user: newUser },
        session: {
          userID: newUser?._id,
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
      };
    }
  };

  return postUser;
};

export default buildPostUser;
