const buildFindUser: BuildGetFindUser = (getUser) => {
  const findUser = async (
    request: ExpressHttpRequest
  ): Promise<IController> => {
    try {
      const user = await getUser(request.body.email as string);

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { user: user },
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
  return findUser;
};

export default buildFindUser;
