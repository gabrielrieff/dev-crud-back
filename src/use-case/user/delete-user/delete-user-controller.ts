import { Request, Response } from "express";
import { DeleteUserUseCase } from "./delete-user-use-case";

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
      await this.deleteUserUseCase.execute({ id });
      return res.status(200).send("User deleted successfully");
    } catch (error) {
      return res.status(400).json({
        message: error.message || "User deletion failed",
      });
    }
  }
}
