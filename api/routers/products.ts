import express, { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

import { imageUpload } from '../middleware/multer';
import Product from '../models/Product';
import auth, { RequestWithUser } from '../middleware/auth';
import Category from '../models/Category';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const category = req.query.category as string | undefined;

  let filter = {};

  if (category) {
    try {
      if (!(await Category.findById(category))) {
        return void res.status(400).send({ error: 'No such category' });
      }

      filter = { category };
    } catch (e) {
      if (e instanceof Error.CastError) {
        res.status(400).send({ error: 'Invalid id' });
      } else {
        next(e);
      }
    }
  }

  const products = await Product.find(filter, { title: 1, price: 1, imageUrl: 1 });

  res.send(products);
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id).populate('seller', { displayName: 1, phoneNumber: 1 });

    if (!product) {
      return void res.status(404).send({ error: 'Product not found' });
    }

    res.send(product);
  } catch (e) {
    if (e instanceof Error.CastError) {
      res.status(400).send({ error: 'Invalid id' });
    } else {
      next(e);
    }
  }
});

router.post('/', [auth, imageUpload.single('image')], async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as RequestWithUser).user;

  try {
    const product = await Product.create({
      title: req.body.title ?? null,
      description: req.body.description ?? null,
      price: req.body.price ?? null,
      imageUrl: req.file?.filename ?? null,
      category: req.body.category ?? null,
      seller: user._id,
    });

    res.send(await Product.populate(product, { path: 'seller', select: { displayName: 1, phoneNumber: 1 } }));
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send(e);
    } else {
      next(e);
    }
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  const id = req.params.id;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return void res.status(404).send({ error: 'Product not found' });
    }

    if (!product.seller._id.equals(user._id)) {
      return void res.status(403).send({ error: 'Product does not belong to user' });
    }

    await Product.deleteOne({ _id: id, seller: user._id });

    res.send();
  } catch (e) {
    if (e instanceof Error.CastError) {
      res.status(400).send({ error: 'Invalid id' });
    } else {
      next(e);
    }
  }
});

export default router;
