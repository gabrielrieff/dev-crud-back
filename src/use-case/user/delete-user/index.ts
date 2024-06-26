import { PostgreSQLUserRepository } from "../../../repositories/user/implementations/postgre-repository";
import { DeleteUserController } from "./delete-user-controller";
import { DeleteUserUseCase } from "./delete-user-use-case";

const postgreSQLRepository = new PostgreSQLUserRepository();

const deleteUserUseCase = new DeleteUserUseCase(postgreSQLRepository);

const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserUseCase, deleteUserController };
