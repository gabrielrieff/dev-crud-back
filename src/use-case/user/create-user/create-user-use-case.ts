import { hash } from "bcryptjs";
import { IUserRepository } from "../../../repositories/user/IUser-repository";
import { ICreateUserDTO } from "./create-user-DTO";
import { User } from "../../../entities/user/user";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    first_name,
    last_name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const isExistUser = await this.userRepository.findOverlappingUserByEmail(
      email
    );

    if (isExistUser) {
      throw new Error("There is already a registered user with this email!");
    }

    const passwordHash = await hash(password, 8);

    const user = new User({
      first_name,
      last_name,
      email,
      password: passwordHash,
    });

    await this.userRepository.create(user);

    return user;
  }
}
