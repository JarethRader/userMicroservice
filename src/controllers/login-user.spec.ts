// @ts-ignore
import makeFakeUser from '../../__test__/user';
import buildLoginUser from './login-user';

let globalUser: any = {};

const authenticate: any = async (email: string, password: string) => {
  return globalUser.password === password ? globalUser.id : undefined;
};

const listUser: any = (id: string) => {
  return globalUser.id === id ? globalUser : undefined;
};

describe('Login User Controller', () => {
  it('Sets session cookie and returns a user', async () => {
    const user = makeFakeUser({
      email: 'jarp@gmail.com',
      password: 'password',
    });
    globalUser = user;
    const loginUser = buildLoginUser(authenticate, listUser);

    const request: ExpressHttpRequest = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        id: user.id,
      },
      body: { email: 'jarp@gmail.com', password: 'password' },
    };
    const expected: IControllerResponse = {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 201,
      body: { user: globalUser },
    };

    const actual = await loginUser(request);
    expect(actual.headers).toEqual(expected.headers);
    expect(actual.statusCode).toEqual(expected.statusCode);
    expect((actual as IControllerResponse).body.user).toEqual(
      expected.body.user
    );
    expect(actual!.session!.userID).toBe(user.id);
  });
});
