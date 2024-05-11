import { describe, it, expect } from "vitest";
import { InMemoryRepository } from "../../../repositories/user/implementations/in-memory-repository";
import { CreateUserUseCase } from "../../../use-case/user/create-user/create-user-use-case";
import { DeleteUserUseCase } from "../../../use-case/user/delete-user/delete-user-use-case";

describe("Delete user", () => {
  const inMemoryRepository = new InMemoryRepository();

  const createUserUseCase = new CreateUserUseCase(inMemoryRepository);
  const deleteUserUseCase = new DeleteUserUseCase(inMemoryRepository);

  it("should be able to deletar usuario", async () => {
    const user = await createUserUseCase.execute({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });

    expect(deleteUserUseCase.execute({ id: user.id })).resolves.toBeUndefined();
  });

  it("not should be able to deletar usuario", async () => {
    expect(deleteUserUseCase.execute({ id: "123123" })).rejects.toBeInstanceOf(
      Error
    );
  });
});
