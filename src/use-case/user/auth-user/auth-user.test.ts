import { describe, it, expect } from "vitest";
import { AuthUserUseCase } from "./auth-user-use-case";
import { InMemoryUserRepository } from "../../../repositories/user/implementations/in-memory-repository";
import { CreateUserUseCase } from "../create-user/create-user-use-case";
import { User } from "../../../entities/user/user";

describe("Authenticated user", async () => {
  const inMemoryRepository = new InMemoryUserRepository();
  const createUserUseCase = new CreateUserUseCase(inMemoryRepository);

  await createUserUseCase.execute({
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com",
    password: "123123",
  });
  const authUserUseCase = new AuthUserUseCase(inMemoryRepository);
  it("should be able to authenticated user", async () => {
    expect(
      authUserUseCase.execute({
        email: "john@gmail.com",
        password: "123123",
      })
    ).resolves.toBeInstanceOf(User);
  });

  it("not should be able to authenticated user", async () => {
    expect(
      authUserUseCase.execute({
        email: "john@gmail.com",
        password: "23123",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
