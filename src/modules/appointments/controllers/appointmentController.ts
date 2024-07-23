import { Request, Response } from "express";
import { CreateAppointment } from "../usecases/createAppointment";
import { FindAvailableSlots } from "../usecases/findAvailableSlots";
import { FindAppointmentById } from "../usecases/findAppointmentById";
import { UpdateAppointment } from "../usecases/updateAppointment";
import { DeleteAppointment } from "../usecases/deleteAppointment";
import { AppointmentRepositoryImpl } from "../repositories/appointmentRepositoryImpl";
import { Appointment } from "../entities/appointment";

const appointmentRepository = new AppointmentRepositoryImpl();
const createAppointment = new CreateAppointment(appointmentRepository);
const findAvailableSlots = new FindAvailableSlots(appointmentRepository);
const findAppointmentById = new FindAppointmentById(appointmentRepository);
const updateAppointment = new UpdateAppointment(appointmentRepository);
const deleteAppointment = new DeleteAppointment(appointmentRepository);

export class AppointmentController {
  async create(req: Request, res: Response) {
    try {
      const {
        userId,
        providerId,
        serviceId,
        startTime,
        duration,
        status,
        bufferTime,
      } = req.body;
      const appointment = new Appointment(
        0, // ID will be auto-generated
        userId,
        providerId,
        serviceId,
        new Date(startTime),
        duration,
        status,
        bufferTime
      );
      const createdAppointment = await createAppointment.execute(appointment);
      return res.status(201).json(createdAppointment);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error creating appointment", error });
    }
  }

  async findAvailableSlots(req: Request, res: Response) {
    try {
      const { providerId, date } = req.query;
      const availableSlots = await findAvailableSlots.execute(
        Number(providerId),
        new Date(date as string)
      );
      return res.status(200).json(availableSlots);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error finding available slots", error });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const appointment = await findAppointmentById.execute(id);
      if (appointment) {
        return res.status(200).json(appointment);
      } else {
        return res.status(404).json({ message: "Appointment not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error finding appointment", error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const {
        userId,
        providerId,
        serviceId,
        startTime,
        duration,
        status,
        bufferTime,
      } = req.body;
      const appointment = new Appointment(
        id,
        userId,
        providerId,
        serviceId,
        new Date(startTime),
        duration,
        status,
        bufferTime
      );
      const updatedAppointment = await updateAppointment.execute(appointment);
      return res.status(200).json(updatedAppointment);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating appointment", error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await deleteAppointment.execute(id);
      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting appointment", error });
    }
  }
}
