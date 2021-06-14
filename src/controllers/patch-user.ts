const buildPatchUser = (editUser: TEditUser) => {
  const patchUser = async (request: ExpressHttpRequest) => {
    try {
      const user = await editUser(request.params.id, request.body)
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
          error: err,
        },
      };
    }
  };
  return patchUser;
};

export default buildPatchUser;
