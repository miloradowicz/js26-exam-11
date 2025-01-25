import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
  },
  {
    strict: 'throw',
    versionKey: false,
  }
);

export default mongoose.model('Category', schema);
