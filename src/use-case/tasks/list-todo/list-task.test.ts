import { describe, it, expect } from "vitest";
import { InMemoryTaskRepository } from "../../../repositories/tasks/implementations/in-memory-repository";
import { InMemoryUserRepository } from "../../../repositories/user/implementations/in-memory-repository";

import { ListTaskUseCase } from "./list-task-use-case";

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
  const listTaskTaskUseCase = new ListTaskUseCase(
    inMemoryTaskRepository,
    inMemoryUserRepository
  );

  const user = await createUserUseCase.execute({
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com",
    password: "123123",
  });

  await createTaskUseCase.execute({
    title: "task01",
    description: "new task",
    userId: user.id,
  });
  await createTaskUseCase.execute({
    title: "task02",
    description: "new task",
    userId: user.id,
  });
  await createTaskUseCase.execute({
    title: "task03",
    description: "new task",
    userId: user.id,
  });

  it("should be able to return list tasks", async () => {
    const tasks = await listTaskTaskUseCase.execute({ userId: user.id });
    expect(tasks.every((task) => task instanceof Task)).toBe(true);
  });
});
