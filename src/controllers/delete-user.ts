const buildDeleteUser = (removeUser: TRemoveUser) => {
  const deleteUser = async (request: ExpressHttpRequest) => {
    try {
      const user = await removeUser(request.params.id)
        .then((updatedUser) => updatedUser)
        .catch((err) => {
          throw err;
        });

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
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
  return deleteUser;
};

export default buildDeleteUser;
