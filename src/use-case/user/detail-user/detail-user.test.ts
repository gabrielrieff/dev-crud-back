import { describe, it, expect } from "vitest";
import { InMemoryUserRepository } from "../../../repositories/user/implementations/in-memory-repository";
import { CreateUserUseCase } from "../create-user/create-user-use-case";
import { DetailUserUseCase } from "./detail-user-use-case";
import { User } from "../../../entities/user/user";

describe("Detail user", () => {
  const inMemoryRepository = new InMemoryUserRepository();
  const createUserUseCase = new CreateUserUseCase(inMemoryRepository);
  const detailUser = new DetailUserUseCase(inMemoryRepository);

  it("should be able to detail is user", async () => {
    const user = await createUserUseCase.execute({
      first_name: "John",
      last_name: "Doe",
      email: "john@gmail.com",
      password: "123123",
    });

    expect(detailUser.execute({ id: user.id })).resolves.toBeInstanceOf(User);
  });
});
