import ObjectID from 'bson-objectid';

const Id = Object.freeze({
  makeId: () => new ObjectID().toHexString(),
  isValidId: (id: string) => ObjectID.isValid(id),
});

export default Id;
