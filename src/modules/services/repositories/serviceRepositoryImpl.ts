import { ServiceRepository } from "./serviceRepository";
import { Service } from "../entities/service";
import { prisma } from "../../../infrastructure/database/prismaClient";
import { Service as PrismaService } from "@prisma/client";

export class ServiceRepositoryImpl implements ServiceRepository {
  async create(service: Service): Promise<Service> {
    const createdService = await prisma.service.create({
      data: {
        name: service.name,
        duration: service.duration,
        description: service.description,
      },
    });

    return new Service(
      createdService.id,
      createdService.name,
      createdService.duration,
      createdService.description ?? undefined,
      createdService.updatedAt,
      createdService.createdAt
    );
  }

  async findById(id: number): Promise<Service | null> {
    const service = await prisma.service.findUnique({
      where: { id: id },
    });

    return service
      ? new Service(
          service.id,
          service.name,
          service.duration,
          service.description ?? undefined,
          service.updatedAt,
          service.createdAt
        )
      : null;
  }

  async findAll(): Promise<Service[]> {
    const services = await prisma.service.findMany();

    return services.map(
      (service: PrismaService) =>
        new Service(
          service.id,
          service.name,
          service.duration,
          service.description ?? undefined,
          service.updatedAt,
          service.createdAt
        )
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
      updatedService.duration,
      updatedService.description ?? undefined,
      updatedService.updatedAt,
      updatedService.createdAt
    );
  }

  async delete(id: number): Promise<void> {
    await prisma.service.delete({
      where: { id: id },
    });
  }
}
