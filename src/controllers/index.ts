import buildPostUser from "./post-user";
import buildPatchUser from "./patch-user";
import buildDeleteUser from "./delete-user";
import buildGetUser from "./get-user";
import buildLoginUser from "./login-user";

import {
  addUser,
  editUser,
  removeUser,
  findUser,
  authenticateCredentials,
} from "../use-cases";

const postUser = buildPostUser(addUser);
const patchUser = buildPatchUser(editUser);
const deleteUser = buildDeleteUser(removeUser);
const getUser = buildGetUser(findUser);
const loginUser = buildLoginUser(authenticateCredentials, findUser);

const userControllers = Object.freeze({
  postUser,
  patchUser,
  deleteUser,
  getUser,
  loginUser,
});

export default userControllers;
export { postUser, patchUser, deleteUser, getUser, loginUser };
