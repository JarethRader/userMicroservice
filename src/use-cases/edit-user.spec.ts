// @ts-ignore
import makeFakeUser from '../../__test__/user';
import buildEditUser from './edit-user';
import makeDb from '../data-access';
import User from '../db';

const validate: any = async (user: any) => user;

describe('Edit user', () => {
  it('updates a user', async () => {
    const newUser = makeFakeUser({ username: 'jareth' });

    const userInstance = await makeDb();
    await userInstance.insert(newUser);

    const editUser = buildEditUser(makeDb, validate);
    const changed = await editUser(newUser.id, {
      username: 'jarp',
    });

    expect(changed?.username).toBe('jarp');
  });
});
