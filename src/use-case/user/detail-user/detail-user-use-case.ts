import { User } from "../../../entities/user/user";
import { IUserRepository } from "../../../repositories/user/IUser-repository";
import { IDetailUserDTO } from "./detail-user-DTO";

export class DetailUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ id }: IDetailUserDTO): Promise<Omit<User, "password">> {
    const user = await this.userRepository.detail(id);
    if (!user) {
      throw new Error("User was not found");
    }

    return user;
  }
}
