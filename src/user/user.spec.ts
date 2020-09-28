// @ts-ignore
import makeFakeUser from '../../__test__/user';
import makeUser from '.';
import argon from 'argon2';

describe('user', () => {
  it('Must have a valid id', () => {
    const user = makeFakeUser({ id: null });
    expect(() => makeUser(user)).toThrow('Must have a valid id');
  });
  it('Must have a username', () => {
    const user = makeFakeUser({ username: null });
    expect(() => makeUser(user)).toThrow('Must have a username');
  });
  it('Must have a valid email address', () => {
    const user = makeFakeUser({ email: null });
    expect(() => makeUser(user)).toThrow('Must have a valid email address');
  });
  it('Must have a valid password', () => {
    const user = makeFakeUser({ password: null });
    expect(() => makeUser(user)).toThrow('Must have a password');
  });
  it('Must require passwords to have atleast 8 characters', () => {
    const user = makeFakeUser({ password: 'passwor' });
    expect(() => makeUser(user)).toThrow(
      'Password must be longer than 8 charcters'
    );
  });
  it('Must hash the password', async () => {
    const user = makeUser({ ...makeFakeUser({ password: 'password' }) });
    expect(await user.getPassword()).not.toEqual('password');
    expect(argon.verify(await user.getPassword(), 'password')).toBeTruthy();
  });
  it('Can be verified', () => {
    const user = makeUser({ ...makeFakeUser({}) });
    expect(user.getVerified()).toBeFalsy();
    user.verify();
    expect(user.getVerified()).toBeTruthy();
  });
});
