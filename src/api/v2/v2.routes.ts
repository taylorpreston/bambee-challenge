import express, { Router } from "express";
import tasksRoutes from "./tasks/v2.tasks.routes";

const router: Router = express.Router();

router.use("/tasks", tasksRoutes);

export default router;
