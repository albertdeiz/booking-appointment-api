import { Provider } from "../entities/provider";
import { ProviderRepository } from "../repositories/providerRepository";

export class FindProviderById {
  constructor(private providerRepository: ProviderRepository) {}

  async execute(id: number): Promise<Provider | null> {
    // Implement business logic for finding a provider by ID
    return await this.providerRepository.findById(id);
  }
}
