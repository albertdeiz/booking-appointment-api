import { ServiceRepository } from "../repositories/serviceRepository";

export class DeleteService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: number): Promise<void> {
    // Implement business logic for deleting a service
    await this.serviceRepository.delete(id);
  }
}
