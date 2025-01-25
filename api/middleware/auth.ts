import { NextFunction, Request, Response } from 'express';

import User, { Fields as UserFields } from '../models/User';

export interface RequestWithUser extends Request {
  user: UserFields;
}

const auth = async (_req: Request, res: Response, next: NextFunction) => {
  const req = _req as RequestWithUser;
  const token = req.get('Authorization');

  const user = await User.findOne({ token });

  if (!user) {
    return void res.status(401).send({ error: 'Invalid token' });
  }

  req.user = user;
  next();
};

export default auth;
