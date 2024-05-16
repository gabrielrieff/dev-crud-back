import { Task } from "../../../entities/task/task";
import { ITaskRepository } from "../../../repositories/tasks/ITask-repository";
import { IUserRepository } from "../../../repositories/user/IUser-repository";
import { IListTaskDTO } from "./list-task-DTO";

export class ListTaskUseCase {
  constructor(
    private taskRepository: ITaskRepository,
    private userRepository: IUserRepository
  ) {}
  private readonly today = new Date();

  private readonly start = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate()
  );
  private readonly end = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate() + 1
  );

  async execute({
    userId,
    endOfDay = this.end,
    startOfDay = this.start,
  }: IListTaskDTO): Promise<Task[]> {
    const user = await this.userRepository.findOverlappingUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const tasks = await this.taskRepository.listTasks(
      userId,
      endOfDay,
      startOfDay
    );

    return tasks;
  }
}
