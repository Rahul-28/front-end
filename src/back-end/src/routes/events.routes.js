import { Router } from "express";
const eventRouter = Router();

import {
  createEvent,
  deleteEventById,
  getAllEvents,
  getEventById,
  updateEventById,
} from "../controllers/events.controller.js";

eventRouter.get("/getAll", getAllEvents);

eventRouter.get("/get/:id", getEventById);

eventRouter.delete("/delete/:id", deleteEventById);

eventRouter.post("/create", createEvent);

eventRouter.put("/update/:id", updateEventById);

export default eventRouter;
