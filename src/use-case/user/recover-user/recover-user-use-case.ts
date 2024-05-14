import { hash } from "bcryptjs";
import { IUserRepository } from "../../../repositories/user/IUser-repository";
import { IRecoverUserDTO } from "./recover-user-DTO";
import { createEmailPathBase, transporter } from "../../../services/mailer";

export class RecoverUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email }: IRecoverUserDTO): Promise<void> {
    const user = await this.userRepository.findOverlappingUserByEmail(email);

    if (!user) {
      throw new Error("We couldn't find the registered user!");
    }

    const password = String(Math.floor(Math.random() * 1000000000));

    const hashedPassword = await hash(password, 8);

    await this.userRepository.recoverPassword(email, hashedPassword);

    const template = await createEmailPathBase("auth/recover-password", {
      password,
    });

    transporter.sendMail({
      to: {
        name: "dev-crud",
        address: "gabrielrieff1@gmail.com",
      },
      from: {
        name: user.first_name,
        address: user.email,
      },
      subject: "Recuperação de Senha",
      html: template,
    });
  }
}
