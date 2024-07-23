import { Service } from "../entities/service";
import { ServiceRepository } from "../repositories/serviceRepository";

export class FindServiceById {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: number): Promise<Service | null> {
    // Implement business logic for finding a service by ID
    return await this.serviceRepository.findById(id);
  }
}
