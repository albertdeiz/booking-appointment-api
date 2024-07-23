import { Provider } from "../entities/provider";
import { ProviderRepository } from "../repositories/providerRepository";

export class CreateProvider {
  constructor(private providerRepository: ProviderRepository) {}

  async execute(provider: Provider): Promise<Provider> {
    // Implement business logic for creating a provider
    return await this.providerRepository.create(provider);
  }
}
