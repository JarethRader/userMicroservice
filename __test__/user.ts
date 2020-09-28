import faker from 'faker';
import Id from '../src/Id';

const makeFakeUser = ({ ...overrides }) => {
  const password = faker.internet.password();

  const user = {
    id: Id.makeId(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password,
    verified: false,
    createdOn: Date.now(),
    modifiedOn: Date.now(),
  };

  return {
    ...user,
    ...overrides,
  };
};

export default makeFakeUser;
