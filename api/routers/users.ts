import express from 'express';
import { Error } from 'mongoose';

import User from '../models/User';
import auth, { RequestWithUser } from '../middleware/auth';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      phoneNumber: req.body.phoneNumber,
    });

    user.generateToken();
    await user.save();

    res.send(user);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send(e);
    } else {
      next(e);
    }
  }
});

router.delete('/sessions', auth, async (_req, res, next) => {
  const req = _req as RequestWithUser;

  const user = await User.findById(req.user._id);

  if (user) {
    user.generateToken();
    await user.save();

    res.send({ message: 'Logged out' });
  } else {
    res.status(204).send({ message: 'Not logged in' });
  }
});

router.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return void res.status(401).send({ errors: { username: { name: 'username', message: 'User not found' } } });
    }

    if (!(await user.checkPassword(req.body.password))) {
      return void res.status(401).send({ errors: { password: { name: 'password', message: 'Wrong password' } } });
    }

    user.generateToken();
    await user.save();

    return void res.send({ message: 'Authenticated', user });
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send({ error: e.message });
    } else {
      next(e);
    }
  }
});

export default router;
