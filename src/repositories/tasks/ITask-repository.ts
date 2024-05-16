import { Task } from "../../entities/task/task";

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
  finish(id: string): Promise<Task>;

  findOverlappingTaskById(id: string): Promise<Task | null>;
}
