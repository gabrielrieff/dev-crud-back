import { ITaskRepository } from "../../../repositories/tasks/ITask-repository";
import { IDeleteTaskDTO } from "./delete-task-DTO";

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute({ id }: IDeleteTaskDTO) {
    const overlappyngTask = this.taskRepository.findOverlappingTaskById(id);

    if (!overlappyngTask) {
      throw new Error("We couldn't find the Task");
    }

    await this.taskRepository.delete(id);
  }
}
