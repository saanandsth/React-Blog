import Blog from '../models/Blog';
import User from '../models/User';
import mongoose from 'mongoose';

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: 'No Blogs Found' });
  }
  return res.status(200).json({ blogs });
};

// for adding the blog
export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: 'Unable to find user by this id' });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    // defining start session
    session.startTransaction();
    // saving the blog from the same session we have created
    await blog.save({ session });
    // we are sending blogs to the existing user array
    existingUser.blogs.push(blog);
    // saving user
    await existingUser.save({ session });
    // commiting the session
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res.status(200).json({ blog });
};

// updating the blog
export const updateBlog = async (req, res, next) => {
  // getting the title and desc from request
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;

  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }
  // if the blog is not correct
  if (!blog) {
    return res.status(500).json({ message: 'Unable to Update the blog' });
  }
  return res.status(200).json({ blog });
};

// Get Blog of specific Id
export const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: 'No Blog Found' });
  }
  return res.status(200).json({ blog });
};

// delete the blog of specific id
export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    // this blog will contain the blog and user's object
    blog = await Blog.findByIdAndRemove(id).populate('user');
    // it will remove the blog from the user's array
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    return console.log(error);
  }
  // if id of blog is not present
  if (!blog) {
    return res.status(500).json({ message: 'Unable to delete' });
  }
  return res.status(200).json({ message: 'Successfully deleted' });
};

// get all the blogs by user id
export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate('blogs');
  } catch (error) {
    return console.log(error);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: 'No Blogs Found' });
  }
  return res.status(200).json({ blogs: userBlogs });
};
