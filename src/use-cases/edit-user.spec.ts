// @ts-ignore
import makeFakeUser from "../../__test__/user";
// @ts-ignore
import makeDB from "../../__test__/db";
import User from "../db";
import buildEditUser from "./edit-user";

import makeUserDB from "../data-access/user-db";

const validate = async (user: TUser) => user;

describe("Edit user", () => {
  const db = makeDB();

  beforeEach(async () => await db.dbConnect());
  afterEach(async () => await db.dbDisconnect());

  it("Makes a new user object to insert", async () => {
    const userDB = makeUserDB(User);
    const user = makeFakeUser({});
    await userDB.insert(user);

    const edit = makeFakeUser({ ...user, username: "jareth" });
    // @ts-ignore
    const editUser = buildEditUser(userDB, validate);
    await editUser(edit._id, edit);

    const foundUser = await userDB.findOneByID(edit._id);
    expect(foundUser.username).toEqual("jareth");
  });
});
