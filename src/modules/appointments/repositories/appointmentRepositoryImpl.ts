import { AppointmentRepository } from "./appointmentRepository";
import { Appointment } from "../entities/appointment";
import { prisma } from "../../../infrastructure/database/prismaClient";

export class AppointmentRepositoryImpl implements AppointmentRepository {
  async create(appointment: Appointment): Promise<Appointment> {
    return await prisma.appointment.create({
      data: {
        userId: appointment.userId,
        providerId: appointment.providerId,
        serviceId: appointment.serviceId,
        startTime: appointment.startTime,
        duration: appointment.duration,
        status: appointment.status,
        bufferTime: appointment.bufferTime,
      },
    });
  }

  async findAvailableSlots(providerId: number, date: Date): Promise<Date[]> {
    const appointments = await prisma.appointment.findMany({
      where: {
        providerId: providerId,
        startTime: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(23, 59, 59, 999)),
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    const availableSlots: Date[] = [];
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    let currentTime = startOfDay;

    for (const appointment of appointments) {
      const appointmentStart = new Date(appointment.startTime);
      const appointmentEnd = new Date(
        appointmentStart.getTime() +
          appointment.duration * 60000 +
          appointment.bufferTime * 60000
      );

      if (currentTime < appointmentStart) {
        availableSlots.push(new Date(currentTime));
        currentTime = appointmentEnd;
      } else {
        currentTime = appointmentEnd;
      }
    }

    if (currentTime < endOfDay) {
      availableSlots.push(new Date(currentTime));
    }

    return availableSlots;
  }

  async findById(id: number): Promise<Appointment | null> {
    const appointment = await prisma.appointment.findUnique({
      where: { id: id },
    });
    return appointment
      ? new Appointment(
          appointment.id,
          appointment.userId,
          appointment.providerId,
          appointment.serviceId,
          appointment.startTime,
          appointment.duration,
          appointment.status,
          appointment.bufferTime
        )
      : null;
  }

  async update(appointment: Appointment): Promise<Appointment> {
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointment.id },
      data: {
        userId: appointment.userId,
        providerId: appointment.providerId,
        serviceId: appointment.serviceId,
        startTime: appointment.startTime,
        duration: appointment.duration,
        status: appointment.status,
        bufferTime: appointment.bufferTime,
      },
    });

    return new Appointment(
      updatedAppointment.id,
      updatedAppointment.userId,
      updatedAppointment.providerId,
      updatedAppointment.serviceId,
      updatedAppointment.startTime,
      updatedAppointment.duration,
      updatedAppointment.status,
      updatedAppointment.bufferTime
    );
  }

  async delete(id: number): Promise<void> {
    await prisma.appointment.delete({
      where: { id: id },
    });
  }
}
