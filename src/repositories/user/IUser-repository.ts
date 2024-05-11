import { User } from "../../entities/user/user";

export interface IUserRepository {
  create(data: User): Promise<User>;
  delete(id: string): Promise<void>;
  detail(id: string): Promise<User | null>;
  findOverlappyngUser(email: string): Promise<User | null>;
}
