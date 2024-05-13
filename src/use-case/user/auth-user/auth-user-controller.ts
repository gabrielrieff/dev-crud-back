import { Request, Response } from "express";
import { AuthUserUseCase } from "./auth-user-use-case";

export class AuthUserController {
  constructor(private authUserUseCase: AuthUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await this.authUserUseCase.execute({
        email,
        password,
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Error while trying to authenticated user",
      });
    }
  }
}
