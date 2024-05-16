import { Task } from "../../../entities/task/task";
import prismaClient from "../../../services/prisma";
import { ITaskRepository } from "../ITask-repository";

export class PostgreSQLTasksRepository implements ITaskRepository {
  async create(task: Task): Promise<Task> {
    const Todo = await prismaClient.todo.create({
      data: task,
    });

    return Todo;
  }

  async delete(id: string): Promise<void> {
    await prismaClient.todo.delete({
      where: {
        id: id,
      },
    });
  }

  async finish(id: string): Promise<Task> {
    const task = await prismaClient.todo.update({
      where: {
        id: id,
      },
      data: {
        finish_at: new Date(),
      },
    });

    return task;
  }

  async findOverlappingTaskById(id: string): Promise<Task | null> {
    const overlappyngTask = await prismaClient.todo.findFirst({
      where: {
        id: id,
      },
    });

    if (!overlappyngTask) {
      return null;
    }

    return overlappyngTask;
  }
}
