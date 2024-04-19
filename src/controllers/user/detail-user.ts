import { Request, Response } from "express";
import prismaClient from "../../services/prisma";

export class DetailUserController {
  async handle(req: Request, res: Response) {
    try {
      const userId = req.userId;

      const detailUser = await prismaClient.user.findFirst({
        where: {
          id: userId,
        },
      });

      return res.status(200).json(detailUser);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  }
}
