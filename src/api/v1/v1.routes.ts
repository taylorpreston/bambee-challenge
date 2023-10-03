import express, { Router } from "express";
import authRoutes from "./auth/v1.auth.routes";
import tasksRoutes from "./tasks/v1.tasks.routes";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/tasks", tasksRoutes);

export default router;
