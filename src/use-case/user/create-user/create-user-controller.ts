import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user-use-case";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { first_name, last_name, email, password } = req.body;
    try {
      const user = await this.createUserUseCase.execute({
        first_name,
        last_name,
        email,
        password,
      });

      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: error.message || "Error while trying to create user",
      });
    }
  }
}
