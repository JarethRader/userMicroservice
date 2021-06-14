// @ts-ignore
import makeFakeUser from "../../__test__/user";
// @ts-ignore
import makeDB from "../../__test__/db";
import User from "../db";
import makeUserDB from "../data-access/user-db";

import buildAuthenticateCredentials from "./authenticate-credentials";
import Password from "../Password";

describe("Authenticate user password", () => {
  const db = makeDB();

  beforeEach(async () => await db.dbConnect());
  afterEach(async () => await db.dbDisconnect());

  it("Authenticate Credentials accurately matches passwords", async () => {
    const userDB = makeUserDB(User);
    const hashed = await Password.hashPassword("Password");
    const user = makeFakeUser({ password: hashed });

    await userDB.insert(user);

    const authenticateCredentials = buildAuthenticateCredentials(
      // @ts-ignore
      userDB,
      Password.validatePassword
    );

    expect(await authenticateCredentials(user.email, "Password")).toBeTruthy();
  });
});
