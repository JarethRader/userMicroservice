const buildPatchUser: BuildPatchUser = (editUser) => {
  const patchUser = async (
    request: ExpressHttpRequest
  ): Promise<IController> => {
    try {
      const updatedUser = await editUser(request.params.id, request.body);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { user: updatedUser },
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
  return patchUser;
};

export default buildPatchUser;
