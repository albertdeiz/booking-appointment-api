import { AppointmentRepository } from "../repositories/appointmentRepository";

export class FindAvailableSlots {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(providerId: number, date: Date): Promise<Date[]> {
    // Implement business logic for finding available slots
    return await this.appointmentRepository.findAvailableSlots(
      providerId,
      date
    );
  }
}
