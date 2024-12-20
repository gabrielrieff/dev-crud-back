import { Task } from "../../../entities/task/task";
import { ITaskRepository } from "../../../repositories/tasks/ITask-repository";
import { IUserRepository } from "../../../repositories/user/IUser-repository";
import { ICreateTaskDTO } from "./create-task-DTO";

export class CreateTaskUseCase {
  constructor(
    private taskRepository: ITaskRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({
    title,
    description,
    created_at,
    userId,
  }: ICreateTaskDTO): Promise<Task> {
    const user = await this.userRepository.findOverlappingUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const task = new Task({
      userId,
      title,
      description,
      created_at: new Date(created_at),
    });

    await this.taskRepository.create(task);

    return task;
  }
}
