// @ts-ignore
import makeFakeUser from "../../__test__/user";
// @ts-ignore
import makeDB from "../../__test__/db";

import makeUserDB from "./user-db";
import User from "../db";

describe("User db", () => {
  const db = makeDB();

  beforeEach(async () => await db.dbConnect());
  afterEach(async () => await db.dbDisconnect());

  it("Adds a new user", async () => {
    const userDB = makeUserDB(User);
    const user = makeFakeUser({});
    const inserted = await userDB.insert(user);
    expect(inserted.id).toEqual(user._id);
    expect(inserted.username).toEqual(user.username);
    expect(inserted.password).toEqual(user.password);
    expect(inserted.email).toEqual(user.email);
  });

  it("Updates a user", async () => {
    const userDB = makeUserDB(User);
    const user = makeFakeUser({ username: "John" });
    const inserted = await userDB.insert(user);
    expect(inserted.username).toEqual("John");
    const updatedUser = makeFakeUser({ ...user, username: "Henry" });
    const updated = await userDB.update(updatedUser._id, updatedUser);
    expect(updated.username).toEqual("Henry");
  });

  it("Removes a user", async () => {
    const userDB = makeUserDB(User);
    const user = makeFakeUser({});
    await userDB.insert(user);
    const removed = await userDB.remove(user._id);
    expect(removed).toBeTruthy();
  });

  it("Finds a user by id", async () => {
    const userDB = makeUserDB(User);
    const user = makeFakeUser({});
    await userDB.insert(user);
    const foundUser = await userDB.findOneByID(user._id);
    expect(foundUser.id).toEqual(user._id);
    expect(foundUser.username).toEqual(user.username);
    expect(foundUser.password).toEqual(user.password);
    expect(foundUser.email).toEqual(user.email);
  });

  it("Finds a user by email", async () => {
    const userDB = makeUserDB(User);
    const user = makeFakeUser({});
    await userDB.insert(user);
    const foundUser = await userDB.findOneByEmail(user.email);
    expect(foundUser.id).toEqual(user._id);
    expect(foundUser.username).toEqual(user.username);
    expect(foundUser.password).toEqual(user.password);
    expect(foundUser.email).toEqual(user.email);
  });
});
