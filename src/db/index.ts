// define mongoDB schema
import { Schema, Model, Document, model } from "mongoose";

declare global {
  type TUserModel = Model<IUserModel, {}, {}>;
}

interface IUser {
  username: string;
  email: string;
  password: string;
  // createdAt: string;
  // updatedAt: string;
}

export interface IUserModel extends IUser, Document {}

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    // default: new Date(),
  },
  updatedAt: {
    type: Date,
    // default: new Date(),
  },
});

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);

export default User;
