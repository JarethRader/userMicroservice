import User from "../db";
import makeUserDB from "./user-db";
import mongoose from "mongoose";
import envConfig from "../env";

const mongoURI = envConfig["MONGO_URI"];

const makeDB = () => {
  return new Promise<TUserDB>(async (resolve, reject) => {
    await mongoose
      .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then((success) => {
        console.log("Connected to MongoDB");
        resolve(makeUserDB(User));
      })
      .catch((err) => reject("Failed to connect to Mongo Database"));
  });
};

export default makeDB;
