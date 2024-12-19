import { Router } from "express";

import { isAuthenticated } from "./middleware/isAuthenticated";

import { createUserController } from "./use-case/user/create-user";
import { authUserController } from "./use-case/user/auth-user";
import { detailUserController } from "./use-case/user/detail-user";
import { updateUserController } from "./use-case/user/update-user";
import { recoverUserController } from "./use-case/user/recover-user";
import { deleteUserController } from "./use-case/user/delete-user";

import { createTaskController } from "./use-case/tasks/create-task";
import { deleteTaskController } from "./use-case/tasks/delete-task";
import { finishTaskController } from "./use-case/tasks/finish-task";
import { listTaskController } from "./use-case/tasks/list-todo";
import { updateTaskController } from "./use-case/tasks/update-task";

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
router.post("/todo", isAuthenticated, (request, response) => {
  return createTaskController.handle(request, response);
});

router.delete("/todo/:id", isAuthenticated, (request, response) => {
  return deleteTaskController.handle(request, response);
});

router.patch("/todo/:id", isAuthenticated, (request, response) => {
  return finishTaskController.handle(request, response);
});

router.get("/todos", isAuthenticated, (request, response) => {
  return listTaskController.handle(request, response);
});

router.patch("/todo-update/:id", isAuthenticated, (request, response) => {
  return updateTaskController.handle(request, response);
});

export { router };
