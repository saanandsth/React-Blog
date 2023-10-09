import User from '../models/User';
import bcrypt from 'bcryptjs';

// it is being called in user-router.js
// Get All users Controller
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    // it will fetch all the records from the mongoose database
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: 'No Records Found' });
  }
  return res.status(200).json({ users });
};

// Sign Up Controller
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: 'User Already Exists' });
  }
  // we we are signing up the user we will create the hashed password using bcrypt js
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ user });
};

// Login Controller
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: 'Could not find user by this email!' });
  }

  // we have a function in bcrypt where we can compare the passwords
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Incorrect Password' });
  }
  return res.status(200).json({ message: 'Login Successfull' });
};
