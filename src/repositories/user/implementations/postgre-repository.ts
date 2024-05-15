import { User } from "../../../entities/user/user";
import prismaClient from "../../../services/prisma";
import { IUpdateUserDTO } from "../../../use-case/user/update-user/update-user-DTO";
import { IUserRepository } from "../IUser-repository";
import { sign } from "jsonwebtoken";

export class PostgreSQLUserRepository implements IUserRepository {
  async create({
    id,
    first_name,
    last_name,
    password,
    email,
  }: User): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        id: id,
        first_name: first_name,
        last_name: last_name,
        password: password,
        email,
      },
    });

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

  async detail(id: string): Promise<User | null> {
    const user = await prismaClient.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async updateUser(data: IUpdateUserDTO): Promise<User> {
    const user = await prismaClient.user.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
        update_at: new Date(),
      },
    });

    return user;
  }

  async recoverPassword(email: string, hashedPassword: string): Promise<void> {
    await prismaClient.user.updateMany({
      where: {
        email: email,
      },
      data: {
        password: hashedPassword,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.user.delete({
      where: {
        id: id,
      },
    });
  }

  async findOverlappingUserById(id: string): Promise<User | null> {
    const overlappyngUser = await prismaClient.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!overlappyngUser) {
      return null;
    }

    return overlappyngUser;
  }

  async findOverlappingUserByEmail(email: string): Promise<User | null> {
    const overlappyngUser = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!overlappyngUser) {
      return null;
    }

    return overlappyngUser;
  }
}
