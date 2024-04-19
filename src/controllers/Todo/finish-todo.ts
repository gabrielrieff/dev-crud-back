import { Request, Response } from "express";
import prismaClient from "../../services/prisma";
import { verifyExistUser } from "../../Helpers/verify-exist-user";

export class FinishTodoController {
  async handle(req: Request, res: Response) {
    try {
      const todoId = req.params.id as string;
      const userId = req.userId;

      if (!todoId || !userId) {
        return res
          .status(404)
          .json({ message: "Id do Todo ou do Usuário não informado" });
      }

      const user = await verifyExistUser(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const todo = await prismaClient.todo.findFirst({
        where: {
          id: todoId,
          userId: userId,
        },
      });

      if (!todo) {
        return res.status(404).json({ message: "Todo não encontrado" });
      }

      const finishedTodo = await prismaClient.todo.update({
        where: {
          id: todoId,
        },
        data: {
          finish_at: new Date(),
        },
      });

      return res
        .status(200)
        .json({ message: "Todo finalizado com sucesso", finishedTodo });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao finalizar Todo" });
    }
  }
}
