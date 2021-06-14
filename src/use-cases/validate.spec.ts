// @ts-ignore
import makeFakeUser from "../../__test__/user";
// @ts-ignore
import makeDB from "../../__test__/db";
import User from "../db";

import makeUserDB from "../data-access/user-db";

import makeValidate from "./validate";

describe("Validate user", () => {
  const db = makeDB();

  beforeEach(async () => await db.dbConnect());
  afterEach(async () => await db.dbDisconnect());

  it("Validates user input", async () => {
    const userDB = makeUserDB(User);
    const user = makeFakeUser({});
    // @ts-ignore
    const validate = makeValidate(userDB);

    const validatedUser = await validate(user);
    expect(validatedUser).toEqual(user);
  });

  it("Does not allow duplicate emails", async () => {
    const userDB = makeUserDB(User);
    const user = makeFakeUser({});
    await userDB.insert(user);
    // @ts-ignore
    const validate = makeValidate(userDB);
    await validate(user).catch((err) => {
      expect(err).toEqual("That email address is already registered");
    });
  });
});
