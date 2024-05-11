import { describe, expect, it } from "vitest";
import { InMemoryRepository } from "../../../repositories/user/implementations/in-memory-repository";
import { CreateUserUseCase } from "../../../use-case/user/create-user/create-user-use-case";
import { User } from "../../../entities/user/user";

describe("Create user", () => {
  const inMemoryRepository = new InMemoryRepository();
  it("should be able to create new user", () => {
    const createUserUseCase = new CreateUserUseCase(inMemoryRepository);

    expect(
      createUserUseCase.execute({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      })
    ).resolves.toBeInstanceOf(User);
  });

  it("not should be able to create new user", async () => {
    const createUserUseCase = new CreateUserUseCase(inMemoryRepository);

    await createUserUseCase.execute({
      first_name: "John",
      last_name: "Doe",
      email: "john@gmail.com",
      password: "123123",
    });

    expect(
      createUserUseCase.execute({
        first_name: "John",
        last_name: "Doe",
        email: "john@gmail.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
