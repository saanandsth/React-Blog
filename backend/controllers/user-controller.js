import User from '../models/User';

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
