import { Provider } from "../entities/provider";
import { ProviderRepository } from "../repositories/providerRepository";

export class UpdateProvider {
  constructor(private providerRepository: ProviderRepository) {}

  async execute(provider: Provider): Promise<Provider> {
    // Implement business logic for updating a provider
    return await this.providerRepository.update(provider);
  }
}
