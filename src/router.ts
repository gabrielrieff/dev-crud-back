import { Router } from "express";

import { isAuthenticated } from "./middleware/isAuthenticated";

import { CreateTodoController } from "./controllers/Todo/create-todo";
import { DeleteTodoController } from "./controllers/Todo/delete-todo";
import { FinishTodoController } from "./controllers/Todo/finish-todo";
import { ListTodosController } from "./controllers/Todo/list-todos";
import { UpdateTodoController } from "./controllers/Todo/update-todo";

import { createUserController } from "./use-case/user/create-user";
import { authUserController } from "./use-case/user/auth-user";
import { detailUserController } from "./use-case/user/detail-user";
import { updateUserController } from "./use-case/user/update-user";
import { recoverUserController } from "./use-case/user/recover-user";
import { deleteUserController } from "./use-case/user/delete-user";

const router = Router();

//user
router.post("/user", (request, response) => {
  return createUserController.handle(request, response);
});

router.post("/session", (request, response) => {
  return authUserController.handle(request, response);
});

router.post("/recover-password", (request, response) => {
  return recoverUserController.handle(request, response);
});

router.get("/detail", isAuthenticated, (request, response) => {
  return detailUserController.handle(request, response);
});

router.patch("/user", isAuthenticated, (request, response) => {
  return updateUserController.handle(request, response);
});

router.delete("/user/:id", isAuthenticated, (request, response) => {
  return deleteUserController.handle(request, response);
});

//todo
router.post("/todo", isAuthenticated, new CreateTodoController().handle);
router.delete("/todo/:id", isAuthenticated, new DeleteTodoController().handle);
router.patch("/todo/:id", isAuthenticated, new FinishTodoController().handle);
router.get("/todo", isAuthenticated, new ListTodosController().handle);
router.patch(
  "/todo-update/:id",
  isAuthenticated,
  new UpdateTodoController().handle
);

export { router };
