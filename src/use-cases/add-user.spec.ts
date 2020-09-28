// @ts-ignore
import getOutputData from '../../__test__/getUser';
// @ts-ignore
import makeFakeUser from '../../__test__/user';
import makeDb from '../data-access';
import makeAddUser from './add-user';
import mongoose from 'mongoose';

const validate: any = async (user: any) => {
  return {
    _id: new mongoose.mongo.ObjectId(user.getId()),
    username: user.getUsername(),
    email: user.getEmail(),
    password: await user.getPassword(),
    verified: user.getVerified(),
    createdAt: user.getCreatedOn(),
    updatedAt: user.getModifiedOn(),
  };
};

describe('add user', () => {
  it('Makes a new User Object', async () => {
    const user = makeFakeUser({});
    const addUser = makeAddUser(makeDb, validate);
    const inserted = await addUser(user);
    expect(getOutputData(inserted)).toEqual(getOutputData(user));
  });
});
