import { Request, Response } from "express";
import { UpdateTaskUseCase } from "./update-task-use-case";

export class UpdateTaskController {
  constructor(private updateTask: UpdateTaskUseCase) {}
  async handle(req: Request, res: Response) {
    try {
      return res.status(200).json();
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Error while trying to list tasks",
      });
    }
  }
}
