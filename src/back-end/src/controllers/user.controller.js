import User from "../models/user.model.js";

// todo: add role based access control
const supreme_clearence = ["ADMIN"];
const org_clearence = ["ADMIN", "ORGANIZER"];
const participation_clearence = ["ADMIN", "ORGANIZER", "USER"];

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundUser = await User.findById(id);
    res.status(200).json(foundUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ message: "User does not exist" });
    }
    res.status(200).json({ message: "User deleted sucessfully" });
  } catch (err) {
    next(err);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    }
    const updatedUser = await User.findById(id);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    next(err);
  }
};
