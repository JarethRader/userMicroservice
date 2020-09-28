// @ts-ignore
import getOutputData from '../../__test__/getUser';
// @ts-ignore
import { User } from '../../__test__/db';
// @ts-ignore
import makeFakeUser from '../../__test__/user';
import makePostUser from './post-user';

const addUser = async (user: IMakeUser) => {
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

describe('Post User Controller', () => {
  it('Posts a new user', async () => {
    const user: IMakeUser = makeFakeUser({});
    const postUser = makePostUser(addUser);

    const request: ExpressHttpRequest = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: { user },
    };

    const expected: IController = {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 201,
      body: { user: request.body.user },
    };

    const actual = await postUser(request);

    expect(actual.headers).toEqual(expected.headers);
    expect(actual.statusCode).toEqual(expected.statusCode);
    expect(getOutputData((actual as IControllerResponse).body.user)).toEqual(
      getOutputData(expected.body.user)
    );
  });
});
