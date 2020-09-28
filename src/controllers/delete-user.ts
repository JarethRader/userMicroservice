const buildDeleteUser: BuildDeleteUser = (removeUser) => {
  const deleteUser = async (
    request: ExpressHttpRequest
  ): Promise<IController> => {
    try {
      const removedUser = await removeUser(request.params.id);

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { user: removedUser },
        session: {
          destroy: true,
        },
      };
    } catch (err) {
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          error: err.message as string,
        },
      };
    }
  };
  return deleteUser;
};

export default buildDeleteUser;
