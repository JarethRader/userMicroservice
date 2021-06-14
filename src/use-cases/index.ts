import buildAddUser from "./add-user";
import buildEditUser from "./edit-user";
import buildRemoveUser from "./remove-user";
import buildFindUser from "./find-user";

import buildAuthenticateCredentials from "./authenticate-credentials";
import makeValidate from "./validate";

import buildMakeDB from "../data-access";

import Password from "../Password";

const userDB = buildMakeDB();

const validate = makeValidate(userDB);

const addUser = buildAddUser(userDB, validate);
const editUser = buildEditUser(userDB, validate);
const removeUser = buildRemoveUser(userDB);
const findUser = buildFindUser(userDB);
const authenticateCredentials = buildAuthenticateCredentials(
  userDB,
  Password.validatePassword
);

const userServices = Object.freeze({
  addUser,
  editUser,
  removeUser,
  findUser,
  authenticateCredentials,
});

export default userServices;
export { addUser, editUser, removeUser, findUser, authenticateCredentials };
