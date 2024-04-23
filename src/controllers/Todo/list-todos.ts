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

      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );

      const todos = await prismaClient.todo.findMany({
        where: {
          userId: userId,
          created_at: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
      });

      console.log(todos);

      return res.status(200).json(todos);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao listar Todos" });
    }
  }
}
