import { Request, Response } from "express";
import prismaClient from "../../services/prisma";
import { verifyExistUser } from "../../Helpers/verify-exist-user";

export class ListTodosController {
  async handle(req: Request, res: Response) {
    try {
      const userId = req.userId;

      const user = verifyExistUser(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const todos = await prismaClient.todo.findMany({
        where: {
          userId: userId,
        },
      });

      return res.status(200).json(todos);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao listar Todos" });
    }
  }
}
