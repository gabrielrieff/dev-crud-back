import { Request, Response } from "express";
import { CreateTaskUseCase } from "./create-task-use-case";

export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}
  async handle(req: Request, res: Response) {
    const userId = req.userId;
    const { title, description } = req.body;

    try {
      const task = this.createTaskUseCase.execute({
        title,
        description,
        userId,
      });

      return res.status(201).json(task);
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Error while trying to create a task",
      });
    }
  }
}
