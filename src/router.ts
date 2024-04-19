import { Router } from "express";
import { CreateUserController } from "./controllers/user/create-user";
import { DeleteUserController } from "./controllers/user/delete-user";
import { DetailUserController } from "./controllers/user/detail-user";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { AuthUserController } from "./controllers/user/auth-user";
import { UpdateUserController } from "./controllers/user/update-user";

const router = Router();

router.post("/user", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.delete("/user/:id", isAuthenticated, new DeleteUserController().handle);
router.get("/detail", isAuthenticated, new DetailUserController().handle);
router.patch("/user", isAuthenticated, new UpdateUserController().handle);

export { router };
