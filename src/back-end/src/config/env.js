import { config } from "dotenv";

config({ path: ".env.development" });

export const { PORT, MONGODB_URI, ACCESS_TOKEN } = process.env;
