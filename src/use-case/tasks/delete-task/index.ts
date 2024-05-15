import { PostgreSQLTasksRepository } from "../../../repositories/tasks/implementations/postgre-repository";
import { DeleteTaskController } from "./delete-task-controller";
import { DeleteTaskUseCase } from "./delete-task-use-case";

const postgreSQLTaskRepository = new PostgreSQLTasksRepository();

const deleteTaskUseCase = new DeleteTaskUseCase(postgreSQLTaskRepository);

const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);

export { deleteTaskUseCase, deleteTaskController };
