import User from '../db';
import makeUserDb from './user-db';
import mongoose from 'mongoose';
import envConfig from '../env';

const MongoURI = envConfig['MONGO_URI'];

export const makeDb = async () => {
  return await mongoose
    .connect(MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(async (success) => {
      return success && makeUserDb(User);
    })
    .catch((err) => {
      throw new Error('Failed to connect to Mongo');
    });
};

export default makeDb;
