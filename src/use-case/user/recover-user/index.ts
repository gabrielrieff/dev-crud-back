import { PostgreSQLRepository } from "../../../repositories/user/implementations/postgre-repository";
import { RecoverUserController } from "./recover-user-controller";
import { RecoverUserUseCase } from "./recover-user-use-case";

const postgreSQLRepository = new PostgreSQLRepository();

const recoverUserUseCase = new RecoverUserUseCase(postgreSQLRepository);

const recoverUserController = new RecoverUserController(recoverUserUseCase);

export { recoverUserUseCase, recoverUserController };
