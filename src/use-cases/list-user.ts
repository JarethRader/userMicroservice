const buildListUser: BuildListUser = (userDb) => {
  const getUser = async (id: string) => {
    const userInstance = await userDb();

    return await userInstance.findOneById(id);
  };
  return getUser;
};

export default buildListUser;
