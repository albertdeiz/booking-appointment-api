import { Provider } from "../entities/provider";

export interface ProviderRepository {
  create(provider: Provider): Promise<Provider>;
  findById(id: number): Promise<Provider | null>;
  findAll(): Promise<Provider[]>;
  update(provider: Provider): Promise<Provider>;
  delete(id: number): Promise<void>;
}
