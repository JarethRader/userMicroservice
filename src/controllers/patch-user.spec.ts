// @ts-ignore
import getOutputData from '../../__test__/getUser';
// @ts-ignore
import { User } from '../../__test__/db';
// @ts-ignore
import makeFakeUser from '../../__test__/user';
import buildPatchUser from './patch-user';

const editUser = async (id: string, user: IEditUser) => {
  const newUser = new User({
    _id: user.user.id,
    username: user.user.username,
    email: user.user.email,
    password: user.user.password,
    verified: user.user.verified,
    createdAt: user.user.createdOn,
    updatedAt: user.user.modifiedOn,
  });
  return newUser;
};

describe('Patch User Controller', () => {
  it('Successfully patches a user', async () => {
    const user = await makeFakeUser({});
    const patchUser = buildPatchUser(editUser);

    const request: ExpressHttpRequest = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        id: user.id,
      },
      body: { user },
    };
    const expected: IControllerResponse = {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: { user: request.body.user },
    };

    const actual = await patchUser(request);

    expect(actual.headers).toEqual(expected.headers);
    expect(actual.statusCode).toEqual(expected.statusCode);
    expect(getOutputData((actual as IControllerResponse).body.user)).toEqual(
      getOutputData(expected.body.user)
    );
  });
});
