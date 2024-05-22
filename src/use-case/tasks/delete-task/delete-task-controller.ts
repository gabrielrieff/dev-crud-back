import { Request, Response } from "express";
import { DeleteTaskUseCase } from "./delete-task-use-case";

export class DeleteTaskController {
  constructor(private deleteTaskUseCase: DeleteTaskUseCase) {}

  async handle(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
      await this.deleteTaskUseCase.execute({ id });
      return res.status(200).send("User deleted successfully");
    } catch (error) {
      return res.status(400).json({
        message: error.message || "User deletion failed",
      });
    }
  }
}
