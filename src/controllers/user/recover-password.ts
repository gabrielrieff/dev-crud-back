import { Request, Response } from "express";
import { transporter, createEmailPathBase } from "../../services/mailer";
import prismaClient from "../../services/prisma";
import { hash } from "bcryptjs";

export class RecoverPasswordController {
  async handle(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const isUser = await prismaClient.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!isUser) {
        return res
          .status(404)
          .json({ message: "Erro ao tentar gerar uma nova senha" });
      }

      const password = String(Math.floor(Math.random() * 1000000000));

      const hashedPassword = await hash(password, 8);

      await prismaClient.user.updateMany({
        where: {
          email: email,
        },
        data: {
          password: hashedPassword,
        },
      });

      const template = await createEmailPathBase("auth/recover-password", {
        password,
      });

      transporter.sendMail({
        to: {
          name: "gabriel",
          address: "gabrielrieff1@gmail.com",
        },
        from: {
          name: "",
          address: email,
        },
        subject: "Recuperação de Senha",
        html: template,
      });

      return res.send("Sua nova senha foi enviado seu e-mail.");
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro ao tentar gerar uma nova senha" });
    }
  }
}
