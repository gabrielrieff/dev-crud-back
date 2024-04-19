import { Request, Response } from "express";
import prismaClient from "../../services/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prismaClient.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Senha ou e-mail inválidos" });
      }

      const token = sign(
        {
          name: user.first_name,
          email: user.email,
        },
        process.env.JWT_SECRET!,
        {
          subject: user.id,
          expiresIn: "10d",
        }
      );

      return res.status(200).json({ token, ...user });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao autenticar usuário" });
    }
  }
}
