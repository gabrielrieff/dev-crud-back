import { Request, Response } from "express";
import { ListTaskUseCase } from "./list-task-use-case";

export class ListTaskController {
  constructor(private taskList: ListTaskUseCase) {}
  async handle(req: Request, res: Response) {
    const userId = req.userId;
    const { start, end, status } = req.query as {
      start: string;
      end: string;
      status?: string;
    };
    try {
      const tasks = await this.taskList.execute({
        userId,
        startOfDay: start,
        endOfDay: end,
        status: status,
      });

      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Error while trying to list tasks",
      });
    }
  }
}
