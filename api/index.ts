import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import config from './config';
import users from './routers/users';
import categories from './routers/categories';
import products from './routers/products';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', users);
app.use('/categories', categories);
app.use('/products', products);

(async () => {
  await mongoose.connect(new URL(config.mongo.db, config.mongo.host).href);

  app.listen(config.express.port, () => {
    console.log(`Server ready on port http://localhost:${config.express.port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
})().catch(console.error);
