import User from '../src/db';
import mongoose from 'mongoose';
import envConfig from '../src/env';

const MongoUri = envConfig['MONGO_URI'];

const makeDb = async () => {
  return await mongoose
    .connect(MongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((success) => {
      if (success) {
        return mongoose.connection;
      }
    })
    .catch((err) => {
      throw new Error('Failed to connect to Mongo');
    });
};

const makeUserDb = async (
  makeDb: mongoose.Connection | undefined,
  userSchema: mongoose.Model<IUserModel>
) => {
  const db = makeDb;
  return db && userSchema;
};

export default makeUserDb;

export { User, makeDb };
