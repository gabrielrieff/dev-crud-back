import { Request, Response } from "express";
import { FinishTaskUseCase } from "./finish-task-use-case";

export class FinishTaskController {
  constructor(private finishTask: FinishTaskUseCase) {}
  async handle(req: Request, res: Response) {
    const todoId = req.params.id as string;
    const userId = req.userId;
    try {
      const finishedTask = await this.finishTask.execute({ todoId, userId });

      return res.status(200).json(finishedTask);
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Error while trying to finished a task",
      });
    }
  }
}
