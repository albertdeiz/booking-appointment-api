import { prismaMock } from "../../../../infrastructure/database/test/singleton";
import { Service } from "../../../../modules/services/entities/service";
import { Provider } from "../../entities/provider";
import { ProviderRepositoryImpl } from "../providerRepositoryImpl";

const mockProvider = new Provider(1, "Nombre del proveedor", [
  new Service(1, "Service 1", 60, "description de servicio 1"),
]);

const mockProviderDb = {
  id: mockProvider.id,
  name: mockProvider.name,
  services: mockProvider.services.map((mockService) => ({
    id: mockService.id,
    name: mockService.name,
    duration: mockService.duration,
    description: mockService.description ?? null,
    updatedAt: mockService.updatedAt,
    createdAt: mockService.createdAt,
  })),
  updatedAt: mockProvider.updatedAt,
  createdAt: mockProvider.createdAt,
};

describe("ProviderRepositoryImpl - tests", () => {
  const repository = new ProviderRepositoryImpl();

  it("should create new provider", async () => {
    prismaMock.provider.create.mockResolvedValue(mockProviderDb);

    await expect(repository.create(mockProvider)).resolves.toEqual(
      mockProvider
    );
  });

  it("should find a provider by id", async () => {
    prismaMock.provider.findUnique.mockResolvedValue(mockProviderDb);

    await expect(repository.findById(1)).resolves.toEqual(mockProvider);
  });

  it("should get all providers", async () => {
    prismaMock.provider.findMany.mockResolvedValue([mockProviderDb]);

    const result = await repository.findAll();

    expect(result).toHaveLength(1);
  });

  it("should update a provider", async () => {
    const testUpdatedMock = "updated name";
    prismaMock.provider.update.mockResolvedValue({
      ...mockProviderDb,
      name: testUpdatedMock,
    });

    const { name } = await repository.update(mockProvider);

    expect(name).toBe(testUpdatedMock);
  });

  it("should delete a provider", async () => {
    prismaMock.provider.delete.mockResolvedValue(mockProviderDb);

    await repository.delete(1);

    expect(prismaMock.provider.delete).toHaveBeenCalledTimes(1);
  });
});
