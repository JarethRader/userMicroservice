import makeUser from '../user';

const buildEditUser: BuildEditUser = (userDb, validate) => {
  const editUser = async (id: string, changeInfo: IEditUser) => {
    const userInstance = await userDb();

    const user = await userInstance.findOneById(id);

    const validated = await validate(changeInfo);

    const changes: IMakeUser = makeUser({
      ...(user && user.toObject()),
      ...validated,
    }).toObject();

    const filtered: IUserObject = Object.keys(changes)
      .filter((key) => key != '_id')
      .reduce((obj: any, key: any) => {
        obj[key] = changes[key];
        return obj;
      }, {});

    const updateduser =
      userInstance && (await userInstance.update(id, filtered));

    return updateduser;
  };
  return editUser;
};

export default buildEditUser;
