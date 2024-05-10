import { expect, test } from "vitest";
import { User } from "./User";

test("create a new user", () => {
  const user = new User({
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com",
    password: "123123",
  });

  expect(user).toBeInstanceOf(User);
});
