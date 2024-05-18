import { PostgreSQLTasksRepository } from "../../../repositories/tasks/implementations/postgre-repository";
import { PostgreSQLUserRepository } from "../../../repositories/user/implementations/postgre-repository";
import { ListTaskController } from "./list-task-controller";
import { ListTaskUseCase } from "./list-task-use-case";

const postgreSQLTaskRepository = new PostgreSQLTasksRepository();
const postgreSQLUserRepository = new PostgreSQLUserRepository();

const listTaskUseCase = new ListTaskUseCase(
  postgreSQLTaskRepository,
  postgreSQLUserRepository
);

const listTaskController = new ListTaskController(listTaskUseCase);

export { listTaskUseCase, listTaskController };
