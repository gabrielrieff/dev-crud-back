import { Request, Response } from "express";
import prismaClient from "../../services/prisma";

export class CreateTodoController {
  async handle(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { title, description } = req.body;

      const user = await prismaClient.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const Todo = await prismaClient.todo.create({
        data: {
          title,
          description,
          userId: userId,
        },
      });

      return res.status(201).json(Todo);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar todo" });
    }
  }
}
