import { Router } from "express";
import { ProviderController } from "../../../modules/providers/controllers/providerController";

const router = Router();
const providerController = new ProviderController();

router.post("/", providerController.add);
router.get("/", providerController.getAll);

export { router as providerRoutes };
