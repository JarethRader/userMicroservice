import faker from "faker";
import ObjectID from "bson-objectid";

const makeFakeUser = ({ ...overrides }) => {
  const user = {
    _id: new ObjectID().toHexString(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return {
    ...user,
    ...overrides,
  };
};

export default makeFakeUser;
