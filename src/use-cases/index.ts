import buildAddUser from './add-user';
import buildEditUser from './edit-user';
import buildListUser from './list-user';
import buildFindUser from './get-user';
import buildRemoveUser from './remove-user';
import buildAuthenticateCredentials from './authenticate-credentials';
import makeDb from '../data-access';
import makeUserValidate from './validateNew';
import makeEditValidate from './validateChanges';
import mongoose from 'mongoose';

import argon2 from 'argon2';

const toObjectId = (id: string) => new mongoose.mongo.ObjectId(id);
const Authenticate = Object.freeze({
  validatePassword: (givenPassword: string, storedPassword: string) => {
    return argon2
      .verify(storedPassword, givenPassword)
      .then((verified: boolean) => {
        return verified;
      })
      .catch((err) => {
        throw err;
      });
  },
});

const userValidate = makeUserValidate(makeDb, toObjectId);
const editValidate = makeEditValidate(makeDb, toObjectId);

const addUser = buildAddUser(makeDb, userValidate);
const editUser = buildEditUser(makeDb, editValidate);
const listUser = buildListUser(makeDb);
const findUser = buildFindUser(makeDb);
const removeUser = buildRemoveUser(makeDb);
const authenticateCredentials = buildAuthenticateCredentials(
  makeDb,
  Authenticate
);

const userServices = Object.freeze({
  addUser,
  editUser,
  listUser,
  findUser,
  removeUser,
  authenticateCredentials,
});

export default userServices;
export {
  addUser,
  editUser,
  listUser,
  findUser,
  removeUser,
  authenticateCredentials,
};
