import { ServiceRepository } from "./serviceRepository";
import { Service } from "../entities/service";
import { prisma } from "../../../infrastructure/database/prismaClient";

export class ServiceRepositoryImpl implements ServiceRepository {
  async create(service: Service): Promise<Service> {
    const createdService = await prisma.service.create({
      data: {
        name: service.name,
        duration: service.duration,
      },
    });

    return new Service(
      createdService.id,
      createdService.name,
      createdService.duration
    );
  }

  async findById(id: number): Promise<Service | null> {
    const service = await prisma.service.findUnique({
      where: { id: id },
    });

    return service
      ? new Service(service.id, service.name, service.duration)
      : null;
  }

  async findAll(): Promise<Service[]> {
    const services = await prisma.service.findMany();

    return services.map(
      (service) => new Service(service.id, service.name, service.duration)
    );
  }

  async update(service: Service): Promise<Service> {
    const updatedService = await prisma.service.update({
      where: { id: service.id },
      data: {
        name: service.name,
        duration: service.duration,
      },
    });

    return new Service(
      updatedService.id,
      updatedService.name,
      updatedService.duration
    );
  }

  async delete(id: number): Promise<void> {
    await prisma.service.delete({
      where: { id: id },
    });
  }
}
