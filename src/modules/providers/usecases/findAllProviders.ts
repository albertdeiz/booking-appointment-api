import { Provider } from "../entities/provider";
import { ProviderRepository } from "../repositories/providerRepository";

export class FindAllProviders {
  constructor(private providerRepository: ProviderRepository) {}

  async execute(): Promise<Provider[]> {
    // Implement business logic for finding all providers
    return await this.providerRepository.findAll();
  }
}
