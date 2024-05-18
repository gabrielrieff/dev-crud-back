import { Task } from "../../../entities/task/task";
import prismaClient from "../../../services/prisma";
import { ITaskRepository } from "../ITask-repository";

export class PostgreSQLTasksRepository implements ITaskRepository {
  async create(task: Task): Promise<Task> {
    await prismaClient.todo.create({
      data: task,
    });

    return task;
  }

  async delete(id: string): Promise<void> {
    await prismaClient.todo.delete({
      where: {
        id: id,
      },
    });
  }

  async finish(id: string): Promise<Task> {
    const task = (await prismaClient.todo.update({
      where: {
        id: id,
      },
      data: {
        finish_at: new Date(),
      },
    })) as Task;

    return task;
  }

  async listTasks(
    userId: string,
    startOfDay: Date,
    endOfDay: Date
  ): Promise<Task[]> {
    const tasks = (await prismaClient.todo.findMany({
      where: {
        userId: userId,
        created_at: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      orderBy: {
        created_at: "asc",
      },
    })) as Task[];

    return tasks;
  }

  async update(task: Task): Promise<void> {
    await prismaClient.todo.update({
      where: { id: task.id },
      data: task,
    });
  }

  async findOverlappingTaskById(id: string): Promise<Task | null> {
    const overlappyngTask = (await prismaClient.todo.findFirst({
      where: {
        id: id,
      },
    })) as Task;

    if (!overlappyngTask) {
      return null;
    }

    return overlappyngTask;
  }
}
