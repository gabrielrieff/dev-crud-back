import { Router } from "express";
import { CreateUserController } from "./controllers/user/create-user";
import { DeleteUserController } from "./controllers/user/delete-user";
import { DetailUserController } from "./controllers/user/detail-user";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { AuthUserController } from "./controllers/user/auth-user";
import { UpdateUserController } from "./controllers/user/update-user";
import { CreateTodoController } from "./controllers/Todo/create-todo";
import { DeleteTodoController } from "./controllers/Todo/delete-todo";
import { FinishTodoController } from "./controllers/Todo/finish-todo";
import { ListTodosController } from "./controllers/Todo/list-todos";
import { UpdateTodoController } from "./controllers/Todo/update-todo";

const router = Router();

//user
router.post("/user", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.delete("/user/:id", isAuthenticated, new DeleteUserController().handle);
router.get("/detail", isAuthenticated, new DetailUserController().handle);
router.patch("/user", isAuthenticated, new UpdateUserController().handle);

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
