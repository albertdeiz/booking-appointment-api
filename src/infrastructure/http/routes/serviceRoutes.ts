import { Router } from "express";
import { ServiceController } from "../../../modules/services/controllers/serviceController";

const router = Router();
const serviceController = new ServiceController();

router.post("/", serviceController.add);
router.get("/", serviceController.getAll);

export { router as serviceRoutes };
