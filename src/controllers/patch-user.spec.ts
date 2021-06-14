// @ts-ignore
import makeFakeUser from "../../__test__/user";
import buildPatchUser from "./patch-user";

const editUser = async (id: string, user: TUser) => user;

describe("Patch User Controller", () => {
  it("Updates a new user", async () => {
    const user = makeFakeUser({});
    // @ts-ignore
    const patchUser = buildPatchUser(editUser);

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        id: user._id,
      },
      body: { user },
    };

    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: { user: request.body.user },
    };

    // @ts-ignore
    const actual = await patchUser(request);

    expect(actual).toEqual(expected);
  });
});
