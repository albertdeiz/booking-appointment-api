import { Appointment } from "../entities/appointment";
import { AppointmentRepository } from "../repositories/appointmentRepository";

export class FindAppointmentById {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(id: number): Promise<Appointment | null> {
    // Implement business logic for finding an appointment by ID
    return await this.appointmentRepository.findById(id);
  }
}
