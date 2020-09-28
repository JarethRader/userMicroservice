// @ts-ignore
import makeFakeUser from '../../__test__/user';
// @ts-ignore
import makeDb from '.';
import User from '../db';

describe('User db', () => {
  it('Adds a user', async () => {
    const userDb = await makeDb();
    const user = makeFakeUser({});
    const inserted = await userDb.insert(user);
    const findUser = await User.findById(user.id);
    expect(findUser?.toObject()).toEqual(inserted?.toObject());
  });

  it('Finds a user by email', async () => {
    const userDb = await makeDb();
    const user = makeFakeUser({});
    const inserted = await userDb.insert(user);
    const findUser = await userDb.findOneByEmail(user.email);
    expect(findUser?.toObject()).toEqual(inserted?.toObject());
  });

  it('Finds a user by id', async () => {
    const userDb = await makeDb();
    const user = makeFakeUser({});
    const inserted = await userDb.insert(user);
    const findUser = await userDb.findOneById(user.id);
    expect(findUser?.toObject()).toEqual(inserted?.toObject());
  });

  it('Updates a user', async () => {
    const userDb = await makeDb();
    const user = makeFakeUser({ username: 'jarp' });
    const inserted = await userDb.insert(user);
    expect(inserted?.username).toBe('jarp');
    const updated = await userDb.update(user.id, { username: 'jareth' });
    expect(updated?.username).toBe('jareth');
  });

  it('Removes a user', async () => {
    const userDb = await makeDb();
    const user = makeFakeUser({});
    await userDb.insert(user);
    await userDb.remove(user.id);
    const findUser = await userDb.findOneById(user.id);
    expect(findUser).not.toBeDefined();
  });
});
