import { PostgreSQLTasksRepository } from "../../../repositories/tasks/implementations/postgre-repository";
import { PostgreSQLUserRepository } from "../../../repositories/user/implementations/postgre-repository";
import { CreateTaskController } from "./create-task-controller";
import { CreateTaskUseCase } from "./create-task-use-case";

const postgreSQLTaskRepository = new PostgreSQLTasksRepository();
const postgreSQLUserRepository = new PostgreSQLUserRepository();

const createTaskUseCase = new CreateTaskUseCase(
  postgreSQLTaskRepository,
  postgreSQLUserRepository
);

const createTaskController = new CreateTaskController(createTaskUseCase);

export { createTaskUseCase, createTaskController };
