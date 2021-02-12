const buildListUser: BuildListUser = (userDb) => {
  const listUser = async (id: string) => {
    const userInstance = await userDb();

    return await userInstance.findOneById(id);
  };
  return listUser;
};

export default buildListUser;
