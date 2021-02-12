const buildFindUser: BuildGetUser = (userDb) => {
  const findUser = async (email: string) => {
    const userInstance = await userDb();

    return await userInstance.findOneByEmail(email);
  };
  return findUser;
};

export default buildFindUser;
