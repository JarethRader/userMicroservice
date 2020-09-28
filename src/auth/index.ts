import express from 'express';

const buildAuthMiddleware = (makeDb: () => Promise<UserDB>) => {
  return Object.freeze({
    checkSignIn: async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const db = await makeDb();
      const { userID } = req!.session!;
      // Check for token
      if (!userID) {
        return res.status(401).send('authorizaton denied');
      } else {
        const user = db.findOneById(userID);
        if (!user) {
          res.status(404).send('User not found');
        }
        res.locals.user = user;
      }
      next();
    },
    checkSignOut: (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const { userID } = req!.session!;
      // Check for token
      if (!userID) {
        return res.status(401).send('Not logged in');
      }
      next();
    },
  });
};

export default buildAuthMiddleware;
