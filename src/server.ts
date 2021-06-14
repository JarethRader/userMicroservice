import express from "express";
import envConfig from "./env";

import {
  postUser,
  patchUser,
  deleteUser,
  getUser,
  loginUser,
} from "./controllers";
import makeExpressCallback from "./express-callback";

import morgan from "morgan";
import helmet from "helmet";

const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

// define user routes
// login
app.post(`${envConfig["API_ROOT"]}/user/login`, makeExpressCallback(loginUser));
// register
app.post(
  `${envConfig["API_ROOT"]}/user/register`,
  makeExpressCallback(postUser)
);
// update
app.patch(`${envConfig["API_ROOT"]}/user/:id`, makeExpressCallback(patchUser));
// delete
app.delete(
  `${envConfig["API_ROOT"]}/user/:id`,
  makeExpressCallback(deleteUser)
);
// get
app.get(`${envConfig["API_ROOT"]}/user/:id`, makeExpressCallback(getUser));

app.listen(port, () => console.log(`User server started on port ${port}...`));

export default app;
