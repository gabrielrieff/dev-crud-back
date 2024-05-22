import { IUserRepository } from "../../../repositories/user/IUser-repository";
import { IDeleteUserDTO } from "./delete-user-DTO";

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ id }: IDeleteUserDTO): Promise<void> {
    const overlappyngUser = await this.userRepository.findOverlappingUserById(
      id
    );

    if (!overlappyngUser) {
      throw new Error("We couldn't find the user");
    }

    await this.userRepository.delete(id);
  }
}
