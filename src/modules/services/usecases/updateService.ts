import { Service } from "../entities/service";
import { ServiceRepository } from "../repositories/serviceRepository";

export class UpdateService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(service: Service): Promise<Service> {
    // Implement business logic for updating a service
    return await this.serviceRepository.update(service);
  }
}
