import { describe, expect, it } from "vitest";
import { Task } from "./task";
import { User } from "../user/user";

describe("teste", () => {
  it("", () => {
    const user = new User({
      first_name: "John",
      last_name: "Doe",
      email: "john@gmail.com",
      password: "123123",
    });

    const task = new Task({
      title: "task01",
      description: "new task",
      userId: user.id,
    });

    expect(task).toBeInstanceOf(Task);
  });
});
