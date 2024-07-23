import { Service } from "../entities/service";

export interface ServiceRepository {
  create(service: Service): Promise<Service>;
  findById(id: number): Promise<Service | null>;
  findAll(): Promise<Service[]>;
  update(service: Service): Promise<Service>;
  delete(id: number): Promise<void>;
}
