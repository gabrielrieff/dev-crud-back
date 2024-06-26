import { PostgreSQLUserRepository } from "../../../repositories/user/implementations/postgre-repository";
import { CreateUserController } from "./create-user-controller";
import { CreateUserUseCase } from "./create-user-use-case";

const postgreSQLRepository = new PostgreSQLUserRepository();

const createUserUseCase = new CreateUserUseCase(postgreSQLRepository);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
