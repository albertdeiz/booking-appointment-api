import { ProviderRepository } from "./providerRepository";
import { Provider } from "../entities/provider";
import { Service } from "../../services/entities/service";
import { prisma } from "../../../infrastructure/database/prismaClient";

export class ProviderRepositoryImpl implements ProviderRepository {
  async create(provider: Provider): Promise<Provider> {
    const createdProvider = await prisma.provider.create({
      data: {
        name: provider.name,
        services: {
          connectOrCreate: provider.services.map(
            ({ id, name, duration, description }) => ({
              where: {
                providerId_serviceId: {
                  providerId: provider.id,
                  serviceId: id,
                },
              },
              create: {
                service: {
                  create: {
                    name,
                    duration,
                    description,
                  },
                },
              },
            })
          ),
        },
      },
      include: {
        services: {
          select: {
            service: true,
          },
        },
      },
    });

    return new Provider(
      createdProvider.id,
      createdProvider.name,
      createdProvider.services.map(
        ({ service }) => new Service(service.id, service.name, service.duration)
      ),
      createdProvider.createdAt
    );
  }

  async findById(id: number): Promise<Provider | null> {
    const provider = await prisma.provider.findUnique({
      where: {
        id,
      },
      include: {
        services: {
          select: {
            service: true,
          },
        },
      },
    });

    return provider
      ? new Provider(
          provider.id,
          provider.name,
          provider.services.map(
            ({ service }) =>
              new Service(service.id, service.name, service.duration)
          ),
          provider.createdAt
        )
      : null;
  }

  async findAll(): Promise<Provider[]> {
    const providers = await prisma.provider.findMany({
      include: {
        services: {
          select: {
            service: true,
          },
        },
      },
    });

    return providers.map(
      (provider) =>
        new Provider(
          provider.id,
          provider.name,
          provider.services.map(
            ({ service }) =>
              new Service(service.id, service.name, service.duration)
          ),
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
          set: provider.services.map(({ id, duration, name, description }) => ({
            providerId_serviceId: {
              providerId: provider.id,
              serviceId: id,
            },
            service: {
              id,
              duration,
              name,
              description,
            },
          })),
        },
      },
      include: {
        services: {
          select: {
            service: true,
          },
        },
      },
    });

    return new Provider(
      updatedProvider.id,
      updatedProvider.name,
      updatedProvider.services.map(
        ({ service }) => new Service(service.id, service.name, service.duration)
      ),
      updatedProvider.createdAt
    );
  }

  async delete(id: number): Promise<void> {
    await prisma.provider.delete({
      where: { id },
    });
  }
}
