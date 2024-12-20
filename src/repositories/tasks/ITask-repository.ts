import { Task } from "../../entities/task/task";

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
  finish(id: string): Promise<Task>;
  listTasks(
    userId: string,
    startDay: Date,
    endDay: Date,
    status?: number
  ): Promise<Task[]>;
  update(task: Task): Promise<void>;

  findOverlappingTaskById(id: string): Promise<Task | null>;
}
