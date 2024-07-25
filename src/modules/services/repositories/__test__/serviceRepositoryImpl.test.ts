import { prismaMock } from "../../../../infrastructure/database/test/singleton";
import { Service } from "../../entities/service";
import { ServiceRepositoryImpl } from "../serviceRepositoryImpl";

const mockService = new Service(
  1,
  "Service 1",
  60,
  "description de servicio 1"
);

const mockServiceDb = {
  id: mockService.id,
  name: mockService.name,
  duration: mockService.duration,
  description: mockService.description ?? null,
  updatedAt: mockService.updatedAt,
  createdAt: mockService.createdAt,
};

describe("ServiceRepositoryImpl", () => {
  const repository = new ServiceRepositoryImpl();

  it("should create new service", async () => {
    prismaMock.service.create.mockResolvedValue(mockServiceDb);

    await expect(repository.create(mockService)).resolves.toEqual(mockService);
  });

  it("should find a service by id", async () => {
    prismaMock.service.findUnique.mockResolvedValue(mockServiceDb);

    await expect(repository.findById(1)).resolves.toEqual(mockService);
  });

  it("should get all services", async () => {
    prismaMock.service.findMany.mockResolvedValue([mockServiceDb]);

    const result = await repository.findAll();

    expect(result).toHaveLength(1);
  });

  it("should update a service", async () => {
    const testUpdatedMock = "updated name";
    prismaMock.service.update.mockResolvedValue({
      ...mockServiceDb,
      name: testUpdatedMock,
    });

    const { name } = await repository.update(mockService);

    expect(name).toBe(testUpdatedMock);
  });

  it("should delete a service", async () => {
    prismaMock.service.delete.mockResolvedValue(mockServiceDb);

    await repository.delete(1);

    expect(prismaMock.service.delete).toHaveBeenCalledTimes(1);
  });
});
