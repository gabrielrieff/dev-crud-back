import { PostgreSQLUserRepository } from "../../../repositories/user/implementations/postgre-repository";
import { DetailUserController } from "./detail-user-controller";
import { DetailUserUseCase } from "./detail-user-use-case";

const postgreSQLRepository = new PostgreSQLUserRepository();

const detailUserUseCase = new DetailUserUseCase(postgreSQLRepository);

const detailUserController = new DetailUserController(detailUserUseCase);

export { detailUserUseCase, detailUserController };
