import { describe, it, expect } from "vitest";
import { InMemoryTaskRepository } from "../../../repositories/tasks/implementations/in-memory-repository";
import { InMemoryUserRepository } from "../../../repositories/user/implementations/in-memory-repository";

import { UpdateTaskUseCase } from "./update-task-use-case";

import { CreateUserUseCase } from "../../user/create-user/create-user-use-case";
import { CreateTaskUseCase } from "../create-task/create-task-use-case";
import { Task } from "../../../entities/task/task";

describe("Return list tasks", async () => {
  const inMemoryTaskRepository = new InMemoryTaskRepository();
  const inMemoryUserRepository = new InMemoryUserRepository();
  const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  const createTaskUseCase = new CreateTaskUseCase(
    inMemoryTaskRepository,
    inMemoryUserRepository
  );
  const updateTaskTaskUseCase = new UpdateTaskUseCase(inMemoryTaskRepository);

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

  it("should be able to return list tasks", async () => {
    expect(
      updateTaskTaskUseCase.execute({
        id: task.id,
        description: "desc atualizada",
      })
    ).resolves.toBeUndefined();
  });
});
