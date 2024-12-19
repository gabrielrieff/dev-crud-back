import { Task } from "../../../entities/task/task";
import { ITaskRepository } from "../../../repositories/tasks/ITask-repository";
import { IUserRepository } from "../../../repositories/user/IUser-repository";
import { IListTaskDTO } from "./list-task-DTO";

export class ListTaskUseCase {
  constructor(
    private taskRepository: ITaskRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({
    userId,
    endOfDay,
    startOfDay,
  }: IListTaskDTO): Promise<Task[]> {
    const user = await this.userRepository.findOverlappingUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const { startDay, endDay } = getStartEndOfDay(startOfDay, endOfDay);

    const tasks = await this.taskRepository.listTasks(userId, startDay, endDay);

    return tasks;
  }
}

function getStartEndOfDay(
  start: string,
  end: string
): { startDay: Date; endDay: Date } {
  const startDay = new Date(start);

  const endDay = new Date(end);
  endDay.setDate(endDay.getDate() + 1);

  return { startDay, endDay };
}
