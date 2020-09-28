// @ts-ignore
import makeFakeUser from '../../__test__/user';
import makeDb from '../data-access';
import buildAuthenticateCredentials from './authenticate-credentials';

const Authenticate = Object.freeze({
  validatePassword: async (givenPassword: string, storedPassword: string) =>
    givenPassword === storedPassword,
});

describe('Authenticate Credentials', () => {
  it('Checks if passwords match', async () => {
    const user = makeFakeUser({ password: 'password' });
    const db = await makeDb();

    await db.insert(user);

    const authenticateCredentials = buildAuthenticateCredentials(
      makeDb,
      Authenticate
    );

    expect(await authenticateCredentials(user.email, 'password')).toBe(user.id);
    expect(
      await authenticateCredentials(user.email, 'notpassword')
    ).toBeUndefined();
  });
});
