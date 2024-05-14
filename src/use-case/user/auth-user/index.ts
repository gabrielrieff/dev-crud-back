import { PostgreSQLRepository } from "../../../repositories/user/implementations/postgre-repository";
import { AuthUserController } from "./auth-user-controller";
import { AuthUserUseCase } from "./auth-user-use-case";

const postgreSQLRepository = new PostgreSQLRepository();

const authUserUseCase = new AuthUserUseCase(postgreSQLRepository);

const authUserController = new AuthUserController(authUserUseCase);

export { authUserUseCase, authUserController };
