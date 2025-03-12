import { Router } from "express";
const participationRouter = Router();

import {
  createParticipant,
  deleteParticipantById,
  getAllParticipants,
  getParticipantById,
  updateParticipantById,
} from "../controllers/participation.controller.js";

participationRouter.get("/getAll", getAllParticipants);

participationRouter.post("/create", createParticipant);

participationRouter.get("/get/:id", getParticipantById);

participationRouter.delete("/delete/:id", deleteParticipantById);

participationRouter.put("/update/:id", updateParticipantById);

export default participationRouter;
