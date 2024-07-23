import { AppointmentRepository } from "../repositories/appointmentRepository";

export class DeleteAppointment {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(id: number): Promise<void> {
    // Implement business logic for deleting an appointment
    await this.appointmentRepository.delete(id);
  }
}
