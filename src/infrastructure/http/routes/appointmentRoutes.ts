import { Router } from "express";
import { AppointmentController } from "../../../modules/appointments/controllers/appointmentController";

const router = Router();
const appointmentController = new AppointmentController();

router.post("/", appointmentController.create);
router.get("/available-slots", appointmentController.availableSlots);

export { router as appointmentRoutes };
