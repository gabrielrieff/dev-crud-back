import { PostgreSQLUserRepository } from "../../../repositories/user/implementations/postgre-repository";
import { AuthUserController } from "./auth-user-controller";
import { AuthUserUseCase } from "./auth-user-use-case";

const postgreSQLRepository = new PostgreSQLUserRepository();

const authUserUseCase = new AuthUserUseCase(postgreSQLRepository);

const authUserController = new AuthUserController(authUserUseCase);

export { authUserUseCase, authUserController };
