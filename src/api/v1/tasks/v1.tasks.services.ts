import { db } from "../../../utils/db";
import { CreateTaskType } from "./v1.tasks.schemas";

const taskFields = {
  id: true,
  title: true,
  description: true,
  status: true,
  createdAt: true,
  updatedAt: true,
};

export function findTasksByUserId(userId: string) {
  return db.task.findMany({
    where: {
      userId,
    },
    select: taskFields,
  });
}

export function findTaskByIdAndUserId(id: number, userId: string) {
  return db.task.findFirst({
    where: {
      id: Number(id),
    },
    select: taskFields,
  });
}

export function createTask(task: CreateTaskType, userId: string) {
  if (!task.id) delete task.id;
  return db.task.create({
    data: {
      ...task,
      userId,
    },
    select: taskFields,
  });
}

export function updateTask(task: CreateTaskType, userId: string) {
  return db.task.update({
    where: {
      id: task.id,
      userId,
    },
    data: {
      ...task,
    },
    select: taskFields,
  });
}
