// @ts-ignore
import makeFakeUser from "../../__test__/user";
import buildPostUser from "./post-user";

const addUser = async (user: TUser) => user;

describe("Post User Controller", () => {
  it("Posts a new user", async () => {
    const user = makeFakeUser({});
    // @ts-ignore
    const postUser = buildPostUser(addUser);

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: { user },
    };

    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
      body: { user: request.body.user },
    };

    // @ts-ignore
    const actual = await postUser(request);

    expect(actual).toEqual(expected);
  });
});
