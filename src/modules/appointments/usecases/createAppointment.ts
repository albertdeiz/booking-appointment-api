import { Appointment } from "../entities/appointment";
import { AppointmentRepository } from "../repositories/appointmentRepository";

export class CreateAppointment {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(appointment: Appointment): Promise<Appointment> {
    // Implement business logic for creating an appointment
    return await this.appointmentRepository.create(appointment);
  }
}
