import { ProviderRepository } from "./providerRepository";
import { Provider } from "../entities/provider";
import { Service } from "../../services/entities/service";
import { prisma } from "../../../infrastructure/database/prismaClient";
import {
  Provider as PrismaProvider,
  Service as PrismaService,
} from "@prisma/client";

export class ProviderRepositoryImpl implements ProviderRepository {
  async create(provider: Provider): Promise<Provider> {
    const createdProvider = await prisma.provider.create({
      data: {
        name: provider.name,
        services: {
          connectOrCreate: provider.services.map((service) => ({
            where: {
              id: service.id,
            },
            create: {
              name: service.name,
              duration: service.duration,
              description: service.description,
            },
          })),
        },
      },
      include: {
        services: true,
      },
    });

    return new Provider(
      createdProvider.id,
      createdProvider.name,
      createdProvider.services.map(
        (service: PrismaService) =>
          new Service(
            service.id,
            service.name,
            service.duration,
            service.description ?? "",
            service.updatedAt,
            service.createdAt
          )
      ),
      createdProvider.updatedAt,
      createdProvider.createdAt
    );
  }

  async findById(id: number): Promise<Provider | null> {
    const provider = await prisma.provider.findUnique({
      where: {
        id,
      },
      include: {
        services: {},
      },
    });

    return provider
      ? new Provider(
          provider.id,
          provider.name,
          provider.services.map(
            (service: PrismaService) =>
              new Service(
                service.id,
                service.name,
                service.duration,
                service.description ?? "",
                service.updatedAt,
                service.createdAt
              )
          ),
          provider.updatedAt,
          provider.createdAt
        )
      : null;
  }

  async findAll(): Promise<Provider[]> {
    const providers = await prisma.provider.findMany({
      include: {
        services: true,
      },
    });

    return providers.map(
      (provider: PrismaProvider & { services: PrismaService[] }) =>
        new Provider(
          provider.id,
          provider.name,
          provider.services.map(
            (service: PrismaService) =>
              new Service(
                service.id,
                service.name,
                service.duration,
                service.description ?? "",
                service.updatedAt,
                service.createdAt
              )
          ),
          provider.updatedAt,
          provider.createdAt
        )
    );
  }

  async update(provider: Provider): Promise<Provider> {
    const updatedProvider = await prisma.provider.update({
      where: { id: provider.id },
      data: {
        name: provider.name,
        services: {
          set: provider.services.map(
            ({ id, duration, name, description }: Service) => ({
              id,
              duration,
              name,
              description,
            })
          ),
        },
      },
      include: {
        services: true,
      },
    });

    return new Provider(
      updatedProvider.id,
      updatedProvider.name,
      updatedProvider.services.map(
        (service: PrismaService) =>
          new Service(
            service.id,
            service.name,
            service.duration,
            service.description ?? "",
            service.updatedAt,
            service.createdAt
          )
      ),
      updatedProvider.updatedAt,
      updatedProvider.createdAt
    );
  }

  async delete(id: number): Promise<void> {
    await prisma.provider.delete({
      where: { id },
    });
  }
}
