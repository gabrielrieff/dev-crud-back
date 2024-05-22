import { ITaskRepository } from "../../../repositories/tasks/ITask-repository";
import { IUpdateTaskDTO } from "./update-task-DTO";

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute({ id, title, description }: IUpdateTaskDTO): Promise<void> {
    const task = await this.taskRepository.findOverlappingTaskById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    if (title) {
      task.title = title;
    }

    if (description) {
      task.description = description;
    }

    return await this.taskRepository.update(task);
  }
}
