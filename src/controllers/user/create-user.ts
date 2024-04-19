import { Request, Response } from "express";
import prismaClient from "../../services/prisma";
import { hash } from "bcryptjs";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { firstName, lastName, password, email } = req.body;

      const isEmailUsed = await prismaClient.user.findFirst({
        where: {
          email: email,
        },
      });

      if (isEmailUsed) {
        return res.status(400).json({ message: "E-mail já utilizado" });
      }

      const hashedPassword = await hash(password, 8);

      const user = await prismaClient.user.create({
        data: {
          first_name: firstName,
          last_name: lastName,
          password: hashedPassword,
          email,
        },
      });

      return res
        .status(201)
        .json({ message: "Usuário criado com sucesso", user });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar usuário" });
    }
  }
}
