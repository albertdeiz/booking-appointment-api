import { AppointmentRepository } from "../repositories/appointmentRepository";

export class GetAvailableSlots {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(providerId: number, date: Date): Promise<Date[]> {
    // Implement business logic for getting available slots
    return await this.appointmentRepository.findAvailableSlots(
      providerId,
      date
    );
  }
}
