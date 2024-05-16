import { Task } from "../../../entities/task/task";
import { ITaskRepository } from "../ITask-repository";

export class InMemoryTaskRepository implements ITaskRepository {
  private db_tasks: Task[] = [];

  async create(task: Task): Promise<Task> {
    await this.db_tasks.push(task);

    return task;
  }

  async delete(id: string): Promise<void> {
    const index = this.db_tasks.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.db_tasks.splice(index, 1);
    }
  }

  async finish(id: string): Promise<Task> {
    const task = await this.db_tasks.find((task) => task.id === id);

    task!.finish_at = new Date();
    return task!;
  }

  async findOverlappingTaskById(id: string): Promise<Task | null> {
    const overlappyngTask = this.db_tasks.find((item) => {
      return item.id === id;
    });

    if (!overlappyngTask) {
      return null;
    }

    return overlappyngTask;
  }
}
