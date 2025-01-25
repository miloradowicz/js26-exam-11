import mongoose from 'mongoose';
import Category from './Category';
import User from './User';

const schema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    price: {
      type: Number,
      required: [true, 'Price is requried'],
      validate: {
        validator: function (value: number) {
          return value > 0;
        },
      },
    },
    imageUrl: { type: String, required: [true, 'Image is required'] },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
      validate: {
        validator: async function (value: mongoose.Types.ObjectId) {
          return !!(await Category.findById(value));
        },
        message: 'Category not found.',
      },
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Seller is required'],
      validate: {
        validator: async function (value: mongoose.Types.ObjectId) {
          return !!(await User.findById(value));
        },
        message: 'User not found',
      },
    },
  },
  {
    strict: 'throw',
    versionKey: false,
  }
);

export default mongoose.model('Product', schema);
