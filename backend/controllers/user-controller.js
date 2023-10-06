import User from '../models/User';

// it is being called in user-router.js
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    // it will fetch all the records from the mongoose database
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: 'No Records Found' });
  }
  return res.status(200).json({ users });
};

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
  const user = new User({
    name,
    email,
    password,
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ user });
};
