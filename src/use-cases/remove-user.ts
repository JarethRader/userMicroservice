const buildRemoveUser: BuildRemoveUser = (userDb) => {
  const deleteUser = async (id: string) => {
    const userInstance = await userDb();

    return await userInstance.remove(id);
  };
  return deleteUser;
};

export default buildRemoveUser;
