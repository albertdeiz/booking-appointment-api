import { ProviderRepository } from "../repositories/providerRepository";

export class DeleteProvider {
  constructor(private providerRepository: ProviderRepository) {}

  async execute(id: number): Promise<void> {
    // Implement business logic for deleting a provider
    await this.providerRepository.delete(id);
  }
}
