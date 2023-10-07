import Blog from '../models/Blog';

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
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    await blog.save();
  } catch (error) {
    return console.log(error);
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
