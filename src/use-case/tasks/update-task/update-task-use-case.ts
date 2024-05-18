import { ITaskRepository } from "../../../repositories/tasks/ITask-repository";
import { IUpdateTaskDTO } from "./update-task-DTO";

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute({ id, description, title }: IUpdateTaskDTO): Promise<void> {
    const task = await this.taskRepository.findOverlappingTaskById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    title && task.changeTitle(title);
    description && task.changeDescription(description);

    await this.taskRepository.update(task);
  }
}
