import { Request, Response } from "express";
import { UpdateTaskUseCase } from "./update-task-use-case";

export class UpdateTaskController {
  constructor(private updateTask: UpdateTaskUseCase) {}
  async handle(req: Request, res: Response) {
    const id = req.params.id as string;
    const { title, description } = req.body;

    try {
      await this.updateTask.execute({ id, title, description });
      return res.status(200).send("Task updated successfully");
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Error while trying to list tasks",
      });
    }
  }
}
