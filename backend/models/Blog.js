import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  // comments: {
  //   type: true,
  //   required: false,
  // },
  // adding relation for blogs with user % user with blogs
  user: {
    // providing reference in mongoDB using mongoose
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('Blog', blogSchema);

// need to implement comments -
