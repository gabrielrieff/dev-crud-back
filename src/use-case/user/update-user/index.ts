import { PostgreSQLUserRepository } from "../../../repositories/user/implementations/postgre-repository";
import { UpdateUserController } from "./update-user-controller";
import { UpdateUserUseCase } from "./update-user-use-case";

const postgreSQLRepository = new PostgreSQLUserRepository();

const updateUserUseCase = new UpdateUserUseCase(postgreSQLRepository);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserUseCase, updateUserController };
