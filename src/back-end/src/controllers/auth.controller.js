import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ACCESS_TOKEN } from "../config/env.js";

export const blacklistedTokens = new Set();

export const register = async (req, res) => {
  const session = mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password, role } = resq.body;

    const user = await User.findOne({ email });
    if (user) {
      const error = new Error("User already exists", 409);
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign({ userId: newUser._id }, ACCESS_TOKEN, {
      expiresIn: "1d",
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { token, user: newUser },
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      const error = new Error("user not found", 404);
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid password", 401);
      throw error;
    }

    const token = jwt.sign(
      { userId: loggedUser._id },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: { token, user },
    });
  } catch (err) {
    next(err);
  }
};

// todo: implement logout
export const logout = async (req, res) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "No token provided!" });
    }

    blacklistedTokens.add(token);

    res
      .status(200)
      .json({ success: true, message: "User signed out successfully" });
  } catch (err) {
    next(err);
  }
};
