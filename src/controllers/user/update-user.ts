import { Request, Response } from "express";
import prismaClient from "../../services/prisma";
import { hash } from "bcryptjs";
import { verifyExistUser } from "../../Helpers/verify-exist-user";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { first_name, last_name, email, password } = req.body;

      const userExists = verifyExistUser(userId);

      if (!userExists) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const dataToUpdate = {
        ...(first_name && { first_name }),
        ...(last_name && { last_name }),
        ...(email && { email }),
        ...(password && { password }),
      };

      if (dataToUpdate.password) {
        const hashedPassword = await hash(password, 8);
        dataToUpdate.password = hashedPassword;
      }

      if (Object.keys(dataToUpdate).length === 0) {
        return res
          .status(400)
          .json({ message: "Nenhum dado fornecido para atualização" });
      }

      const updatedUser = await prismaClient.user.update({
        where: {
          id: userId,
        },
        data: dataToUpdate,
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao fazer o update usuário" });
    }
  }
}
