import { Request, Response } from "express";
import { DetailUserUseCase } from "./detail-user-use-case";

export class DetailUserController {
  constructor(private detailUserUseCase: DetailUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.body;

    try {
      const user = await this.detailUserUseCase.execute(id);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Some problem while fetching the user",
      });
    }
  }
}
