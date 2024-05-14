import { describe, expect, it } from "vitest";
import { InMemoryRepository } from "../../../repositories/user/implementations/in-memory-repository";
import { CreateUserUseCase } from "../create-user/create-user-use-case";
import { RecoverUserUseCase } from "./recover-user-use-case";

describe("Recover password user", async () => {
  const inMemoryRepository = new InMemoryRepository();
  const createUserUseCase = new CreateUserUseCase(inMemoryRepository);

  await createUserUseCase.execute({
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com",
    password: "123123",
  });

  const recoverUserUseCase = new RecoverUserUseCase(inMemoryRepository);
  it("should be able to recover password", () => {
    expect(
      recoverUserUseCase.execute({ email: "john@gmail.com" })
    ).resolves.toBeUndefined();
  });

  it("not should be able to deletar usuario", async () => {
    expect(
      recoverUserUseCase.execute({ email: "john123@gmail.com" })
    ).rejects.toBeInstanceOf(Error);
  });
});
