const buildLogoutUser = () => {
  const logout = async () => {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: {
        user: undefined,
      },
      session: {
        destroy: true,
      },
    };
  };
  return logout;
};

export default buildLogoutUser;
