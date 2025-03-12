import express from "express";
import router from "./routes/index.js";

const expressServer = express();

expressServer.use("/api/v1", router);

export default expressServer;
