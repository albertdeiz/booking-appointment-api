import { Service } from "../../entities/service";
import { ServiceRepositoryImpl } from "../serviceRepositoryImpl";

describe("ServiceRepositoryImpl", () => {
  const repository = new ServiceRepositoryImpl();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a service", async () => {
    const service = new Service(
      1,
      "Service 1",
      60,
      "description de servicio 1"
    );

    const result = await repository.create(service);

    expect(result).toEqual({
      ...service,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  });

  it("should find a service by id", async () => {
    const service = new Service(
      1,
      "Service 1",
      60,
      "description de servicio 1"
    );

    const result = await repository.findById(service.id);

    expect(result).toEqual({
      ...service,
      createdAt: result?.createdAt,
      updatedAt: result?.updatedAt,
    });
  });

  it("should return null if service not found by id", async () => {
    const result = await repository.findById(999);

    expect(result).toBeNull();
  });

  it("should get all services", async () => {
    const result = await repository.findAll();

    expect(result).toHaveLength(1);
  });

  it("should update a service", async () => {
    const service = new Service(
      1,
      "Service 1",
      90,
      "description de servicio 1"
    );

    const result = await repository.update(service);

    expect(result).toEqual({
      ...service,
      createdAt: result?.createdAt,
      updatedAt: result?.updatedAt,
    });
  });

  it("should delete a service", async () => {
    await repository.delete(1);
    const result = await repository.findById(1);

    expect(result).toEqual(null);
  });
});
