import { describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../repositories/user/implementations/in-memory-repository";
import { CreateUserUseCase } from "../create-user/create-user-use-case";
import { UpdateUserUseCase } from "./update-user-use-case";
import { User } from "../../../entities/user/user";

describe("Update user", async () => {
  const inMemoryRepository = new InMemoryUserRepository();
  const createUserUseCase = new CreateUserUseCase(inMemoryRepository);
  const updateUseUseCase = new UpdateUserUseCase(inMemoryRepository);

  const user = await createUserUseCase.execute({
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com",
    password: "123123",
  });

  it("should be able to update user", async () => {
    expect(
      updateUseUseCase.execute({
        id: user.id,
        first_name: "Gabriel",
        email: "gabrielrieff@gmail.com",
      })
    ).resolves.toBeInstanceOf(User);
  });

  it("not should be able to update user", async () => {
    expect(
      updateUseUseCase.execute({
        id: "123",
        first_name: "Gabriel",
        email: "gabrielrieff@gmail.com",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
