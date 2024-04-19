import { Request, Response } from "express";
import prismaClient from "../../services/prisma";
import { verifyExistUser } from "../../Helpers/verify-exist-user";

export class DeleteTodoController {
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

      const todo = await prismaClient.todo.delete({
        where: {
          id: todoId,
        },
      });

      return res.status(200).json({ message: "Todo deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar todo" });
    }
  }
}
