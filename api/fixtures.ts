import mongoose, { Error } from 'mongoose';

import config from './config';
import User from './models/User';
import Category from './models/Category';
import Product from './models/Product';

(async () => {
  await mongoose.connect(new URL(config.mongo.db, config.mongo.host).href);
  const db = mongoose.connection;

  await db.dropCollection('users').catch(() => {
    console.log('skipping users...');
  });

  await db.dropCollection('categories').catch(() => {
    console.log('skipping users...');
  });

  await db.dropCollection('products').catch(() => {
    console.log('skipping users...');
  });

  try {
    const [s, h] = await User.create(
      {
        username: 'swindler111',
        password: '1111',
        displayName: 'Alice',
        phoneNumber: '+996 555 111-222',
        token: crypto.randomUUID(),
      },
      {
        username: 'hustler99',
        password: '2222',
        displayName: 'Bob',
        phoneNumber: '+996 222 333-444',
        token: crypto.randomUUID(),
      }
    );

    const [misc, pets, edibles] = await Category.create(
      {
        name: 'Pets',
      },
      {
        name: 'Edibles',
      },
      {
        name: 'Miscellaneous',
      }
    );

    const products = await Product.create(
      {
        title: 'Umbrella',
        description: 'Person not included',
        price: 300,
        imageUrl: 'demo/image-3.jpg',
        category: misc._id,
        seller: s._id,
      },
      {
        title: 'Hedgehog',
        description: 'Very fluffy',
        price: 3500,
        imageUrl: 'demo/image-11.jpg',
        category: pets._id,
        seller: h._id,
      },
      {
        title: 'Stag',
        description: 'No warranty',
        price: 5000,
        imageUrl: 'demo/image-12.jpg',
        category: pets._id,
        seller: h._id,
      },
      {
        title: 'Black dog',
        description: 'Has color vision (source: trust me bro)',
        price: 4000,
        imageUrl: 'demo/image-13.jpg',
        category: pets._id,
        seller: h._id,
      },
      {
        title: 'Apple',
        description: 'Red and ripe',
        price: 50,
        imageUrl: 'demo/image-17.jpg',
        category: edibles._id,
        seller: h._id,
      },
      {
        title: 'Ladder',
        description: 'That ladder over there',
        price: 450,
        imageUrl: 'demo/image-18.jpg',
        category: misc._id,
        seller: s._id,
      },
      {
        title: 'Heart-shaped baloons',
        description: 'Two of them',
        price: 800,
        imageUrl: 'demo/image-38.jpg',
        category: misc._id,
        seller: s._id,
      },
      {
        title: 'Party ballons',
        description: 'Price per piece (deflated, string not included)',
        price: 500,
        imageUrl: 'demo/image-41.jpg',
        category: misc._id,
        seller: s._id,
      },
      {
        title: 'Unidentified bird',
        description: 'Mistery bird',
        price: 1000,
        imageUrl: 'demo/image-62.jpg',
        category: pets._id,
        seller: h._id,
      },
      {
        title: 'Unidentified bird',
        description: 'Mistery bird',
        price: 2000,
        imageUrl: 'demo/image-63.jpg',
        category: pets._id,
        seller: h._id,
      },
      {
        title: 'Unidentified bird',
        description: 'Mistery bird',
        price: 3000,
        imageUrl: 'demo/image-64.jpg',
        category: pets._id,
        seller: h._id,
      },
      {
        title: 'Owl',
        description: '3 years old',
        price: 3000,
        imageUrl: 'demo/image-68.jpg',
        category: pets._id,
        seller: s._id,
      },
      {
        title: 'Ginger cat',
        description: "Name's Garfield",
        price: 100,
        imageUrl: 'demo/image-108.jpg',
        category: pets._id,
        seller: s._id,
      },
      {
        title: 'Red and white striped scarf',
        description: 'Just like in the picture',
        price: 700,
        imageUrl: 'demo/image-119.jpg',
        category: misc._id,
        seller: s._id,
      },
      {
        title: 'Red cocktail',
        description: 'Refrigerated',
        price: 1500,
        imageUrl: 'demo/image-163.jpg',
        category: edibles._id,
        seller: s._id,
      },
      {
        title: 'Sliced vegetables',
        description: 'Cucumber, tomato, letuce splashed with water',
        price: 330,
        imageUrl: 'demo/image-172.jpg',
        category: edibles._id,
        seller: s._id,
      },
      {
        title: 'A jar of honey',
        description: 'Sticky (300 ml)',
        price: 1030,
        imageUrl: 'demo/image-270.jpg',
        category: edibles._id,
        seller: s._id,
      }
    );
  } finally {
    await db.close();
  }
})()
  .then(() => console.log('finished'))
  .catch(console.error);
