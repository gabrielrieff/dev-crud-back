import { User } from "../../entities/user/user";
import { IUpdateUserDTO } from "../../use-case/user/update-user/update-user-DTO";

export interface IUserRepository {
  create(data: User): Promise<User>;
  delete(id: string): Promise<void>;
  detail(id: string): Promise<User | null>;
  auth(user: User): Promise<User>;
  recoverPassword(email: string, hashedPassword: string): Promise<void>;
  updateUser(data: Omit<IUpdateUserDTO, "id">): Promise<User>;

  findOverlappingUserById(id: string): Promise<User | null>;
  findOverlappingUserByEmail(email: string): Promise<User | null>;
}
