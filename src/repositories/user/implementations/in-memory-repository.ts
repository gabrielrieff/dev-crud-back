import { User } from "../../../entities/user/user";
import { IUpdateUserDTO } from "../../../use-case/user/update-user/update-user-DTO";
import { IUserRepository } from "../IUser-repository";
import { sign } from "jsonwebtoken";

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

  async auth(user: User): Promise<User> {
    const token = sign(
      {
        name: user.first_name,
        email: user.email,
      },
      process.env.JWT_SECRET ?? "aa2553259db043518a820e9e827cd9e0",
      {
        subject: user.id,
        expiresIn: "10d",
      }
    );

    user.token = token;

    return user;
  }

  async recoverPassword(email: string, hashedPassword: string): Promise<void> {
    await this.db_users.map((item) => {
      if (item.email === email) {
        item.password = hashedPassword;
      }
    });
  }

  async updateUser(data: IUpdateUserDTO): Promise<User> {
    const user = await this.db_users.find((item) => item.id === data.id);

    if (user) {
      Object.assign(user, data);
    }
    return user!;
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
