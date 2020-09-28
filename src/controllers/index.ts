import {
  addUser,
  editUser,
  listUser,
  removeUser,
  authenticateCredentials,
} from '../use-cases';
import makePostUser from './post-user';
import makePatchUser from './patch-user';
import makeGetUser from './get-user';
import makeDeleteUser from './delete-user';
import makeLoginUser from './login-user';
import makeLogoutUser from './logout-user';

const postUser = makePostUser(addUser);
const patchUser = makePatchUser(editUser);
const getUser = makeGetUser(listUser);
const deleteUser = makeDeleteUser(removeUser);
const loginUser = makeLoginUser(authenticateCredentials, listUser);
const logoutUser = makeLogoutUser();

const userController = {
  postUser,
  patchUser,
  getUser,
  deleteUser,
  loginUser,
  logoutUser,
};

export default userController;
export { postUser, patchUser, getUser, deleteUser, loginUser, logoutUser };
