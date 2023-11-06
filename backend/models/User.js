import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  // users can have multiple blogs
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
  ],
});

export default mongoose.model('User', userSchema);
// The schema will be stored in the mongoDB as users
