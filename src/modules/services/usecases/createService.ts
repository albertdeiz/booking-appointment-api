import { Service } from "../entities/service";
import { ServiceRepository } from "../repositories/serviceRepository";

export class CreateService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(service: Service): Promise<Service> {
    // Implement business logic for creating a service
    return await this.serviceRepository.create(service);
  }
}
