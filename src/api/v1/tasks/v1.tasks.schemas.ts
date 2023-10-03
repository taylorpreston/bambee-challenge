import * as z from "zod";
import { TASK_STATUSES } from "./v1.tasks.constants";

export const taskSchema = z.object({
  body: z.object({
    id: z.number().optional(),
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(1000),
    status: z.enum([TASK_STATUSES.NEW, TASK_STATUSES.COMPLETED]),
  }),
});

export type CreateTaskType = z.infer<(typeof taskSchema)["shape"]["body"]>;
