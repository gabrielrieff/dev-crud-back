import { describe, it, expect } from "vitest";
import { InMemoryTaskRepository } from "../../../repositories/tasks/implementations/in-memory-repository";
import { InMemoryUserRepository } from "../../../repositories/user/implementations/in-memory-repository";

import { FinishTaskUseCase } from "./finish-task-use-case";

import { CreateUserUseCase } from "../../user/create-user/create-user-use-case";
import { CreateTaskUseCase } from "../create-task/create-task-use-case";
import { Task } from "../../../entities/task/task";

describe("Finished task", async () => {
  const inMemoryTaskRepository = new InMemoryTaskRepository();
  const inMemoryUserRepository = new InMemoryUserRepository();
  const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  const createTaskUseCase = new CreateTaskUseCase(
    inMemoryTaskRepository,
    inMemoryUserRepository
  );
  const finishTaskUseCase = new FinishTaskUseCase(
    inMemoryTaskRepository,
    inMemoryUserRepository
  );

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
  it("should be able to finished task", () => {
    expect(
      finishTaskUseCase.execute({ todoId: task.id, userId: user.id })
    ).resolves.toBeInstanceOf(Task);
  });

  it("not should be able to finished usuario", async () => {
    expect(
      finishTaskUseCase.execute({ todoId: "dasdads", userId: user.id })
    ).rejects.toBeInstanceOf(Error);
  });
});
