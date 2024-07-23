import { Appointment } from "../entities/appointment";
import { AppointmentRepository } from "../repositories/appointmentRepository";

export class UpdateAppointment {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(appointment: Appointment): Promise<Appointment> {
    // Implement business logic for updating an appointment
    return await this.appointmentRepository.update(appointment);
  }
}
