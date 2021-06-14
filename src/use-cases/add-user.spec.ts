// @ts-ignore
import makeFakeUser from "../../__test__/user";
// @ts-ignore
import makeDB from "../../__test__/db";
import User from "../db";
import makeUserDB from "../data-access/user-db";
import buildAddUser from "./add-user";

const validate = async (user: TUser) => user;

describe("Add user", () => {
  const db = makeDB();

  beforeEach(async () => await db.dbConnect());
  afterEach(async () => await db.dbDisconnect());

  it("Makes a new user object to insert", async () => {
    const userDB = makeUserDB(User);
    const user = makeFakeUser({});
    // @ts-ignore
    const addUser = buildAddUser(userDB, validate);
    await addUser(user);

    const foundUser = await userDB.findOneByID(user._id);
    expect(foundUser.id).toEqual(user._id);
  });
});
