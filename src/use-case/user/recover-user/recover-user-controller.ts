import { Request, Response } from "express";
import { RecoverUserUseCase } from "./recover-user-use-case";

export class RecoverUserController {
  constructor(private recoverUserUseCase: RecoverUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { email } = req.body;

    try {
      await this.recoverUserUseCase.execute({
        email,
      });

      return res.send("A new password has been sent to your email");
    } catch (error) {
      return res.status(400).json({
        message:
          error.message || "Error while trying to generate a new password",
      });
    }
  }
}
