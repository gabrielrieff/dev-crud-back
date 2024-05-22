import { Request, Response } from "express";
import { UpdateUserUseCase } from "./update-user-use-case";

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}
  async handle(req: Request, res: Response) {
    const { first_name, last_name, email, password } = req.body;
    const id = req.userId;

    try {
      const user = await this.updateUserUseCase.execute({
        id,
        first_name,
        last_name,
        email,
        password,
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Unable to update your user",
      });
    }
  }
}
