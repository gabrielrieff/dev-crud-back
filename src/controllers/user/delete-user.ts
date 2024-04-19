import { Request, Response } from "express";
import prismaClient from "../../services/prisma";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    try {
      const userId = req.params.id as string;

      if (!userId) {
        return res.status(400).json({ message: "ID não informado" });
      }

      const user = await prismaClient.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      await prismaClient.user.delete({
        where: {
          id: userId,
        },
      });

      return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar usuário" });
    }
  }
}
