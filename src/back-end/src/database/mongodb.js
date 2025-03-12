import chalk from "chalk/index.js";
import mongoose from "mongoose";
import { MONGODB_URI } from "../config/env.js";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing from .env file");
}

const connectToDataBase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(chalk.green("connected to DataBase"));
  } catch (error) {
    console.log(chalk.red("error connecting to DataBase", error));
    process.exit(1);
  }
};

export default connectToDataBase;
