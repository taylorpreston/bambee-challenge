import express, { Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../../../middlewares/authentication";
import { validate } from "../../../middlewares/validate";
import {
  findTasksByUserId,
  createTask,
  findTaskByIdAndUserId,
  updateTask,
} from "./v2.tasks.services";
import { taskSchema } from "./v2.tasks.schemas";

const router = express.Router();

router.get(
  "/",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //@ts-ignore
      const tasks = await findTasksByUserId(req.userId);
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/create",
  isAuthenticated,
  validate(taskSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.id) {
        return res
          .status(400)
          .json({ message: "Id should not be provided in create" });
      }
      //@ts-ignore
      const task = await createTask(req.body, req.userId);
      res.json(task);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) throw new Error("No id provided");
      //@ts-ignore
      const task = await findTaskByIdAndUserId(req.params.id, req.userId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(task);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  isAuthenticated,
  validate(taskSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) throw new Error("No id provided");
      //@ts-ignore
      const task = await findTaskByIdAndUserId(req.params.id, req.userId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      //@ts-ignore
      const updatedTask = await updateTask(req.body, req.userId);
      res.json(updatedTask);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
