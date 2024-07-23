import { Request, Response } from "express";
import {
  CreateProvider,
  DeleteProvider,
  FindAllProviders,
  FindProviderById,
  UpdateProvider,
} from "../usecases";
import { ProviderRepositoryImpl } from "../repositories/providerRepositoryImpl";
import { Provider } from "../entities/provider";
import { Service } from "../../services/entities/service";

const providerRepository = new ProviderRepositoryImpl();
const createProvider = new CreateProvider(providerRepository);
const findProviderById = new FindProviderById(providerRepository);
const findAllProviders = new FindAllProviders(providerRepository);
const updateProvider = new UpdateProvider(providerRepository);
const deleteProvider = new DeleteProvider(providerRepository);

export class ProviderController {
  async create(req: Request, res: Response) {
    try {
      const { name, services } = req.body;
      const serviceInstances = services.map(
        (service: any) =>
          new Service(service.id, service.name, service.duration)
      );
      const provider = new Provider(
        0, // ID will be auto-generated
        name,
        serviceInstances
      );
      const createdProvider = await createProvider.execute(provider);
      return res.status(201).json(createdProvider);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error creating provider", error });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const provider = await findProviderById.execute(id);
      if (provider) {
        return res.status(200).json(provider);
      } else {
        return res.status(404).json({ message: "Provider not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error finding provider", error });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const providers = await findAllProviders.execute();
      return res.status(200).json(providers);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error finding providers", error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name, services } = req.body;
      const serviceInstances = services.map(
        (service: any) =>
          new Service(service.id, service.name, service.duration)
      );
      const provider = new Provider(id, name, serviceInstances);
      const updatedProvider = await updateProvider.execute(provider);
      return res.status(200).json(updatedProvider);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating provider", error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await deleteProvider.execute(id);
      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting provider", error });
    }
  }
}
