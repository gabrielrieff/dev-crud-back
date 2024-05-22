import { PostgreSQLTasksRepository } from "../../../repositories/tasks/implementations/postgre-repository";
import { UpdateTaskController } from "./update-task-controller";
import { UpdateTaskUseCase } from "./update-task-use-case";

const postgreSQLTaskRepository = new PostgreSQLTasksRepository();

const updateTaskUseCase = new UpdateTaskUseCase(postgreSQLTaskRepository);

const updateTaskController = new UpdateTaskController(updateTaskUseCase);

export { updateTaskUseCase, updateTaskController };
