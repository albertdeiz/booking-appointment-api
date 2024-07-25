import { Service } from "../../../../modules/services/entities/service";
import { Provider } from "../../entities/provider";
import { ProviderRepositoryImpl } from "../providerRepositoryImpl";

describe("ProviderRepositoryImpl - tests", () => {
  const repository = new ProviderRepositoryImpl();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should create an provider with new service", async () => {
    const provider = new Provider(1, "Nombre del proveedor", [
      new Service(1, "Service 1", 60, "description de servicio 1"),
    ]);

    const { id, name, services } = await repository.create(provider);

    expect(id).toBe(provider.id);
    expect(name).toBe(provider.name);

    for (let i = 0; i < services.length; i++) {
      expect(services[i].id).toBe(provider.services[i].id);
      expect(services[i].name).toBe(provider.services[i].name);
    }
  });

  it("should create an provider with a exists service", async () => {
    const provider = new Provider(2, "Nombre del proveedor 2", [
      new Service(1, "Service 1", 60, "description de servicio 1_"),
    ]);

    const { id, name, services } = await repository.create(provider);

    expect(id).toBe(provider.id);
    expect(name).toBe(provider.name);

    for (let i = 0; i < services.length; i++) {
      expect(services[i].id).toBe(provider.services[i].id);
      expect(services[i].name).toBe(provider.services[i].name);
    }
  });
});
