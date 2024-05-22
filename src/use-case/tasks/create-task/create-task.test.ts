import { describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../repositories/user/implementations/in-memory-repository";
import { InMemoryTaskRepository } from "../../../repositories/tasks/implementations/in-memory-repository";
import { CreateTaskUseCase } from "./create-task-use-case";
import { CreateUserUseCase } from "../../user/create-user/create-user-use-case";

describe("Create new task", async () => {
  const inMemoryTaskRepository = new InMemoryTaskRepository();
  const inMemoryUserRepository = new InMemoryUserRepository();
  const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  const createTaskUseCase = new CreateTaskUseCase(
    inMemoryTaskRepository,
    inMemoryUserRepository
  );

  const user = await createUserUseCase.execute({
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com",
    password: "123123",
  });
  it("should be able to create new task", () => {
    expect(
      createTaskUseCase.execute({
        title: "task01",
        description: "new task",
        userId: user.id,
      })
    );
  });
});
