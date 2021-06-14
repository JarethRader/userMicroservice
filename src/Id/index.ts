// User MongoDB bson type
import ObjectID from "bson-objectid";

const Id = Object.freeze({
  makeID: () => new ObjectID().toHexString(),
  isValidId: (id: string) => ObjectID.isValid(id),
});

export default Id;
