import { Request, Response } from "express";
import { verifyExistUser } from "../../Helpers/verify-exist-user";
import prismaClient from "../../services/prisma";

export class UpdateTodoController {
  async handle(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const todoId = req.params.id as string;
      const { title, description } = req.body;

      const userExists = verifyExistUser(userId);

      if (!userExists) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const todo = await prismaClient.todo.findFirst({
        where: {
          id: todoId,
        },
      });

      if (todo?.userId !== userId) {
        return res.status(404).json({ message: "Erro no TODO" });
      }

      if (!todo) {
        return res.status(404).json({ message: "Todo não encontrado" });
      }

      const dataToUpdate = {
        ...(title && { title }),
        ...(description && { description }),
      };

      if (Object.keys(dataToUpdate).length === 0) {
        return res
          .status(400)
          .json({ message: "Nenhum dado fornecido para atualização" });
      }

      const updateTodo = await prismaClient.todo.update({
        where: { id: todoId },
        data: dataToUpdate,
      });

      return res.status(200).json(updateTodo);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao fazer o update Todo" });
    }
  }
}
