import { Service } from "../entities/service";
import { ServiceRepository } from "../repositories/serviceRepository";

export class FindAllServices {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(): Promise<Service[]> {
    // Implement business logic for finding all services
    return await this.serviceRepository.findAll();
  }
}
