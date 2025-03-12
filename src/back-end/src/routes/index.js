import { Router } from "express";
const router = Router();

import eventRoutes from "./events.routes.js";
import userRoutes from "./users.routes.js";
import participationRoutes from "./participation.routes.js";
import authRoutes from "./auth.routes.js";

router.use("/auth", authRoutes);
router.use("/events", eventRoutes);
router.use("/users", userRoutes);
router.use("/participation", participationRoutes);

export default router;
