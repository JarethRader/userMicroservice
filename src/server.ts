import express from 'express';
import envConfig from './env';
import {
  postUser,
  patchUser,
  listSelf,
  findOther,
  deleteUser,
  loginUser,
  logoutUser,
} from './controllers';
import makeCallback from './express-callback';

import buildAuthMiddleware from './auth';
import buildRedisStore from './cache';
import buildCookieConfig from './cookie';
// import buildLogout from './logout';

import morgan from 'morgan';
import helmet from 'helmet';

import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import makeDb from './data-access';
// import csrf from 'csurf';
// import rateLimit from 'express-rate-limit';

const cookieConfig = buildCookieConfig(envConfig);

const auth = buildAuthMiddleware(makeDb);

const app = express();

const port = process.env.PORT || 5000;

// http request logger
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.use(
  session({
    name: envConfig['SESS_NAME'],
    store: buildRedisStore(session, envConfig),
    resave: true,
    rolling: true,
    saveUninitialized: false,
    secret: envConfig['SESS_SECRET'],
    cookie: cookieConfig,
  })
);

const corsOptions = cors({
  credentials: true,
  origin: envConfig['PUBLIC_PATH'],
  maxAge: parseInt(envConfig['SESS_LIFETIME'], 10),
});

app.options(envConfig['PUBLIC_PATH'], corsOptions);
app.use(corsOptions);

// cookieConfig['key'] = '_csrf';
// export const csrfProtection = csrf({
//   cookie: cookieConfig,
// });
app.use(cookieParser(envConfig['COOKIE_SECRET']));
// app.use(
//   csrf({
//     cookie: cookieConfig,
//   })
// );
// send CSRF
// const sendCSRF = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   const token = req.csrfToken();
//   res.cookie('CSRF-Token', token);
//   res.locals.csrftoken = token;
//   next();
// }
// app.get('/', sendCSRF, (req: Request, res: Response) => {
//   if (req!.session!.userId) {
//     return res.status(200).send({ success: true });
//   } else {
//     return res.status(401).send({ success: false });
//   }
// });

// User CRUD
// login
app.post(`${envConfig['API_ROOT']}/user/login`, makeCallback(loginUser));
// logout
app.post(
  `${envConfig['API_ROOT']}/user/logout`,
  auth.checkSignOut,
  makeCallback(logoutUser)
);
// register
app.post(`${envConfig['API_ROOT']}/user`, makeCallback(postUser));
// update
app.patch(
  `${envConfig['API_ROOT']}/user/:id`,
  auth.checkSignIn,
  makeCallback(patchUser)
);
// get own info
app.get(
  `${envConfig['API_ROOT']}/user/:id`,
  auth.checkSignIn,
  makeCallback(listSelf)
);
// get other users info
app.get(
  `${envConfig['API_ROOT']}/user/`,
  auth.checkSignIn,
  makeCallback(findOther)
);
// delete
app.delete(
  `${envConfig['API_ROOT']}/user/:id`,
  auth.checkSignIn,
  makeCallback(deleteUser)
);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send({ error: 'An unknown error occurred.' });
  }
);

app.listen(port, () => console.log(`User API started on port ${port}...`));

export default app;
