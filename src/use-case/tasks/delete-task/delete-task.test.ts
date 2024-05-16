import { describe, it, expect } from "vitest";
import { InMemoryTaskRepository } from "../../../repositories/tasks/implementations/in-memory-repository";
import { InMemoryUserRepository } from "../../../repositories/user/implementations/in-memory-repository";

import { DeleteTaskUseCase } from "./delete-task-use-case";

import { CreateUserUseCase } from "../../user/create-user/create-user-use-case";
import { CreateTaskUseCase } from "../create-task/create-task-use-case";

describe("Delete task", async () => {
  const inMemoryTaskRepository = new InMemoryTaskRepository();
  const inMemoryUserRepository = new InMemoryUserRepository();
  const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  const createTaskUseCase = new CreateTaskUseCase(
    inMemoryTaskRepository,
    inMemoryUserRepository
  );
  const deleteTaskUseCase = new DeleteTaskUseCase(inMemoryTaskRepository);

  const user = await createUserUseCase.execute({
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com",
    password: "123123",
  });

  const task = await createTaskUseCase.execute({
    title: "task01",
    description: "new task",
    userId: user.id,
  });
  it("should be able to deletar task", () => {
    expect(deleteTaskUseCase.execute({ id: task.id })).resolves.toBeUndefined();
  });

  it("not should be able to deletar usuario", async () => {
    expect(deleteTaskUseCase.execute({ id: "123123" })).rejects.toBeInstanceOf(
      Error
    );
  });
});
