import { Task } from "../../../entities/task/task";
import { IUpdateTaskDTO } from "../../../use-case/tasks/update-task/update-task-DTO";
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

  async listTasks(
    userId: string,
    startOfDay: Date,
    endOfDay: Date
  ): Promise<Task[]> {
    const tasks = await this.db_tasks.filter(
      (task) =>
        task.userId === userId &&
        task.created_at! <= startOfDay &&
        task.created_at! >= endOfDay
    );
    return tasks;
  }

  async update(task: Task): Promise<void> {
    await this.db_tasks.find((item) => {
      if (item.id === task.id) {
        Object.assign(item, task);
      }
    });
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
