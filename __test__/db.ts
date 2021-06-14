import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const mongod = new MongoMemoryServer({
  instance: {
    auth: false,
    dbName: "Users",
  },
});

const makeDB = () => {
  return Object.freeze({
    dbConnect: async () => {
      const uri = await mongod.getUri();
      const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      };

      await mongoose.connect(uri, mongooseOptions);
    },
    dbDisconnect: async () => {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongod.stop();
    },
  });
};

export default makeDB;
