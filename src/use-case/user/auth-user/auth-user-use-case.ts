import { compare } from "bcryptjs";
import { IUserRepository } from "../../../repositories/user/IUser-repository";
import { IAuthUserDTO } from "./auth-user-DTO";
import { User } from "../../../entities/user/user";

export class AuthUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: IAuthUserDTO): Promise<User> {
    const user = await this.userRepository.findOverlappingUserByEmail(email);

    if (!user) {
      throw new Error("There is already a registered user with this email!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid password or email");
    }

    const authenticatedUser = await this.userRepository.auth(user);

    return authenticatedUser;
  }
}
