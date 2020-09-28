const buildGetUser: BuildGetUser = (listUser) => {
  const GetUser = async (request: ExpressHttpRequest): Promise<IController> => {
    try {
      const listedUser = await listUser(request.params.id);

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { user: listedUser },
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
  return GetUser;
};

export default buildGetUser;
