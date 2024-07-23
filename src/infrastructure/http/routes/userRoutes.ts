import { Router } from "express";
import { UserController } from "../../../modules/users/controllers/userController";

const router = Router();
const userController = new UserController();

router.post("/", userController.add);
router.get("/", userController.getAll);

export { router as userRoutes };
