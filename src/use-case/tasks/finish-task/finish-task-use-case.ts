import { Task } from "../../../entities/task/task";
import { ITaskRepository } from "../../../repositories/tasks/ITask-repository";
import { IUserRepository } from "../../../repositories/user/IUser-repository";
import { IFinishTask } from "./finish-task-DTO";

export class FinishTaskUseCase {
  constructor(
    private taskRepository: ITaskRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({ todoId, userId }: IFinishTask): Promise<Task> {
    const user = await this.userRepository.findOverlappingUserById(userId);
    const task = await this.taskRepository.findOverlappingTaskById(todoId);

    if (!user || !task) {
      throw new Error("User or task not found");
    }

    const updateTask = await this.taskRepository.finish(todoId);

    return updateTask;
  }
}
