import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import config from './config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

(async () => {
  await mongoose.connect(new URL(config.mongo.db, config.mongo.host).href);

  app.listen(config.express.port, () => {
    console.log(`Server ready on port http://localhost:${config.express.port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
})().catch(console.error);
