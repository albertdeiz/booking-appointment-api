import { Request, Response } from "express";
import {
  CreateService,
  DeleteService,
  FindAllServices,
  FindServiceById,
  UpdateService,
} from "../usecases";
import { ServiceRepositoryImpl } from "../repositories/serviceRepositoryImpl";
import { Service } from "../entities/service";

const serviceRepository = new ServiceRepositoryImpl();
const createService = new CreateService(serviceRepository);
const findServiceById = new FindServiceById(serviceRepository);
const findAllServices = new FindAllServices(serviceRepository);
const updateService = new UpdateService(serviceRepository);
const deleteService = new DeleteService(serviceRepository);

export class ServiceController {
  async create(req: Request, res: Response) {
    try {
      const { name, duration } = req.body;
      const service = new Service(
        0, // ID will be auto-generated
        name,
        duration
      );
      const createdService = await createService.execute(service);
      return res.status(201).json(createdService);
    } catch (error) {
      return res.status(500).json({ message: "Error creating service", error });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const service = await findServiceById.execute(id);
      if (service) {
        return res.status(200).json(service);
      } else {
        return res.status(404).json({ message: "Service not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error finding service", error });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const services = await findAllServices.execute();
      return res.status(200).json(services);
    } catch (error) {
      return res.status(500).json({ message: "Error finding services", error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name, duration } = req.body;
      const service = new Service(id, name, duration);
      const updatedService = await updateService.execute(service);
      return res.status(200).json(updatedService);
    } catch (error) {
      return res.status(500).json({ message: "Error updating service", error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await deleteService.execute(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Error deleting service", error });
    }
  }
}
