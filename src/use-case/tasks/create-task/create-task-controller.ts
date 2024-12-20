import { Request, Response } from "express";
import { CreateTaskUseCase } from "./create-task-use-case";

export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}
  async handle(req: Request, res: Response) {
    const userId = req.userId;
    const { title, description, created_at } = req.body;
    console.log(created_at);
    try {
      const task = await this.createTaskUseCase.execute({
        title,
        description,
        created_at,
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
