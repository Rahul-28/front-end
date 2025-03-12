import { Router } from "express";
const userRouter = Router();
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/user.controller.js";

userRouter.get("/getAll", getAllUsers);

userRouter.get("/get/:id", getUserById);

userRouter.delete("/delete/:id", deleteUserById);

userRouter.put("/update/:id", updateUserById);

export default userRouter;
