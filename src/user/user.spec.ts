// @ts-ignore
import makeFakeUser from "../../__test__/user";
import makeUser from ".";

describe("user", () => {
  it("Must have a valid id", async () => {
    const user = makeFakeUser({ _id: null });
    await makeUser(user).catch((err) => {
      expect(err).toEqual("Must have a valid id");
    });
  });
  it("Must have a valid username", async () => {
    const user = makeFakeUser({ username: null });
    await makeUser(user).catch((err) => {
      expect(err).toEqual("Must have a username");
    });
  });
  it("Must have an email", async () => {
    const user = makeFakeUser({ email: null });
    await makeUser(user).catch((err) => {
      expect(err).toEqual("Must have a valid email");
    });
  });
  it("email must be a valid email format", async () => {
    const user = makeFakeUser({ email: "jarethATmailDOTcom" });
    await makeUser(user).catch((err) => {
      expect(err).toEqual("Must have a valid email");
    });
  });
  it("email validation works on valid emails", async () => {
    const user = makeFakeUser({ email: "jareth@mail.com" });
    expect(async () => await makeUser(user)).not.toThrow();
  });
});
