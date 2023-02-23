import { z } from "zod";

const subTask = z.object({
  id: z.string(),
  description: z.string(),
  completed: z.boolean(),
});

const task = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  subTasks: z.array(subTask),
  column: z.string(),
});

const column = z.object({
  name: z.string(),
  tasks: z.array(task),
});

const board = z.object({
  name: z.string(),
  id: z.string(),
  columns: z.array(column),
});

type activeModal =
  | "createBoard"
  | "createColumn"
  | "createTask"
  | "editTask"
  | "editBoard"
  | "deleteBoard"
  | "deleteTask"
  | "none";

export type Board = z.infer<typeof board>;
export type Column = z.infer<typeof column>;
export type Task = z.infer<typeof task>;
export type SubTask = z.infer<typeof subTask>;
export type ActiveModal = activeModal;
