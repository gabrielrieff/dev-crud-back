import { hash } from "bcryptjs";
import { IUserRepository } from "../../../repositories/user/IUser-repository";
import { IUpdateUserDTO } from "./update-user-DTO";
import { User } from "../../../entities/user/user";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    id,
    first_name,
    last_name,
    email,
    password,
  }: IUpdateUserDTO): Promise<User> {
    const isExistUser = await this.userRepository.findOverlappingUserById(id);

    if (!isExistUser) {
      throw new Error("We couldn't find the registered user");
    }

    const dataToUpdate = {
      id: id,
      ...(first_name && { first_name }),
      ...(last_name && { last_name }),
      ...(email && { email }),
      ...(password && { password }),
    };

    if (dataToUpdate.password) {
      const hashedPassword = await hash(password!, 8);
      dataToUpdate.password = hashedPassword;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      throw new Error("No data provided for update");
    }

    const user = await this.userRepository.updateUser(dataToUpdate);

    return user;
  }
}
