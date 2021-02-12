/// <reference types='node' />

import { Model, Document, Request, Response, NextFunction } from 'mongoose';
import session from 'express-session';
import express from 'express';

declare global {
  // User types
  type MakeUser = (userInput: IMakeUser) => IUserObject;

  interface IEditUser {
    [key: string]: any;
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    verified?: boolean;
    createdOn?: number;
    modifiedOn?: number;
  }

  interface IMakeUser {
    [key: string]: any;
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    verified?: boolean;
    createdOn?: number;
    modifiedOn?: number;
  }

  interface IUserObject {
    getId: () => string;
    getUsername: () => string;
    getEmail: () => string;
    getPassword: () => Promise<string>;
    getCreatedOn: () => number;
    getModifiedOn: () => number;
    getVerified: () => boolean;
    verify: () => void;
    toObject: () => IMakeUser;
  }

  // Validation types
  interface IEditValidate {
    (userInfo: IEditUser): Promise<{
      [key: string]: any;
    }>;
  }

  interface IUserValidate {
    (user: IUserObject): Promise<{
      [index: number]: string;
      _id: mongodb.ObjectId;
      username: string;
      email: string;
      password: string;
      verified: boolean;
      createdAt: number;
      updatedAt: number;
    }>;
  }

  type MakeUserValidate = (
    userDB: () => Promise<UserDB>,
    toObjectId: (id: string) => ObjectId
  ) => IUserValidate;

  type MakeEditValidate = (
    userDB: () => Promise<UserDB>,
    toObjectId: (id: string) => ObjectId
  ) => IEditValidate;

  // Database
  //  Schema
  interface IUser {
    username: string;
    email: string;
    password: string;
    verified: boolean;
  }

  interface IUserModel extends IUser, Document {}

  //  Connection

  type UserDB = Readonly<{
    insert: (userInfo: any) => Promise<IUserModel | undefined>;
    findOneByEmail: (email: string) => Promise<IUserModel | undefined>;
    findOneById: (id: string) => Promise<IUserModel | undefined>;
    remove: (id: string) => Promise<IUserModel | undefined>;
    update: (
      id: string,
      updatedInfo: IEditUser
    ) => Promise<IUserModel | undefined>;
  }>;
  type MakeDB = (userSchema: mongoose.Model<IUserModel>) => UserDB;

  // use-case types
  type BuildAddUser = (
    userDB: () => Promise<UserDB>,
    validate: IUserValidate
  ) => (userInfo: IMakeUser) => Promise<IUserModel | undefined>;

  type BuildEditUser = (
    userDB: () => Promise<UserDB>,
    validate: IEditValidate
  ) => (id: string, changeInfo: IEDitUser) => Promise<IUserModel | undefined>;

  type BuildListUser = (
    userDB: () => Promise<UserDB>
  ) => (id: string) => Promise<IUserModel | undefined>;

  type BuildGetUser = (
    userDB: () => Promise<UserDB>
  ) => (email: string) => Promise<IUserModel | undefined>;

  type BuildRemoveUser = (
    userDB: () => Promise<UserDB>
  ) => (id: string) => Promise<IUserModel | undefined>;

  // Controller
  interface IControllerResponse {
    headers: {
      'Content-Type': string;
    };
    statusCode: number;
    body: {
      user: IUserModel | undefined;
    };
    session?: {
      userID?: string;
      destroy?: boolean;
    };
  }

  interface IControllerError {
    headers: {
      'Content-Type': string;
    };
    statusCode: number;
    body: {
      error: string | undefined;
    };
    session?: {
      userID?: string;
      destroy?: boolean;
    };
  }

  type IController = IControllerResponse | IControllerError;

  type BuildPostUser = (
    addUser: (userInfo: IMakeUser) => Promise<IUserModel | undefined>
  ) => (request: ExpressHttpRequest) => Promise<IController>;

  type BuildPatchUser = (
    editUser: (
      id: string,
      changeInfo: IEditUser
    ) => Promise<IUserModel | undefined>
  ) => (request: ExpressHttpRequest) => Promise<IController>;

  type BuildDeleteUser = (
    removeUser: (id: string) => Promise<IUserModel | undefined>
  ) => (request: ExpressHttpRequest) => Promise<IController>;

  type BuildGetListUser = (
    listUser: (id: string) => Promise<IUserModel | undefined>
  ) => (request: ExpressHttpRequest) => Promise<IController>;

  type BuildGetFindUser = (
    getUser: (email: string) => Promise<IUserModel | undefined>
  ) => (request: ExpressHttpRequest) => Promise<IController>;

  // Express callback
  interface ExpressHttpRequest {
    body: any;
    query?: QueryString.ParsedQs;
    params?: ParamsDictionary;
    ip?: string;
    method?: string;
    path?: string;
    headers: {
      'Content-Type': string | undefined;
      Referer?: string;
      'User-Agent'?: string;
    };
  }

  type MakeExpressCallback = (
    controller: (request: ExpressHttpRequest) => Promise<IController>
  ) => (req: Request, res: Response, next: NextFunction) => void;

  // cache store
  type BuildRedisStore = (
    session: (
      options?: session.SessionOptions | undefined
    ) => express.RequestHandler,
    envConfig: dotenv.DotenvParseOutput
  ) => any;

  type BuildCookieConfig = (
    envConfig: dotenv.DotenvParseOutput
  ) => {
    [key: string]: any;
    maxAge: number;
    sameSite: boolean;
    secure: boolean;
  };

  // logout
  type BuildLogout = (envConfig: dotenv.DotenvParseOutput) => Logout;

  type Logout = (req: express.Request, res: express.Response) => Promise<void>;
}
