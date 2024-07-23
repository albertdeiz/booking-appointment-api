import { Appointment } from "../entities/appointment";

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<Appointment>;
  findAvailableSlots(providerId: number, date: Date): Promise<Date[]>;
  findById(id: number): Promise<Appointment | null>;
  update(appointment: Appointment): Promise<Appointment>;
  delete(id: number): Promise<void>;
}
