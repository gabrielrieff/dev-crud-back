import { PostgreSQLTasksRepository } from "../../../repositories/tasks/implementations/postgre-repository";
import { PostgreSQLUserRepository } from "../../../repositories/user/implementations/postgre-repository";
import { FinishTaskController } from "./finish-task-controller";
import { FinishTaskUseCase } from "./finish-task-use-case";

const postgreSQLTaskRepository = new PostgreSQLTasksRepository();
const postgreSQLUserRepository = new PostgreSQLUserRepository();

const finishTaskUseCase = new FinishTaskUseCase(
  postgreSQLTaskRepository,
  postgreSQLUserRepository
);

const finishTaskController = new FinishTaskController(finishTaskUseCase);

export { finishTaskUseCase, finishTaskController };
