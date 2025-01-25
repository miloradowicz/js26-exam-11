import express from 'express';

import Category from '../models/Category';

const router = express.Router();

router.get('/', async (_, res) => {
  const categories = await Category.find();

  res.send(categories);
});

export default router;
