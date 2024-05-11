import { User } from "../../../entities/user/user";
import { IUserRepository } from "../IUser-repository";

export class InMemoryRepository implements IUserRepository {
  private db_users: User[] = [];

  async create(data: User): Promise<User> {
    this.db_users.push(data);

    return data;
  }

  async delete(id: string): Promise<void> {
    const index = this.db_users.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.db_users.splice(index, 1);
    }
  }

  async detail(id: string): Promise<User | null> {
    const user = this.db_users.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findOverlappingUserByEmail(email: string): Promise<User | null> {
    const overlappyngUser = this.db_users.find((item) => {
      return item.email === email;
    });

    if (!overlappyngUser) {
      return null;
    }

    return overlappyngUser;
  }

  async findOverlappingUserById(id: string): Promise<User | null> {
    const overlappyngUser = this.db_users.find((item) => {
      return item.id === id;
    });

    if (!overlappyngUser) {
      return null;
    }

    return overlappyngUser;
  }
}
