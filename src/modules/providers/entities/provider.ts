import { Service } from "../../services/entities/service";

export class Provider {
  constructor(
    public id: number,
    public name: string,
    public services: Service[], // List of Service instances
    public updatedAt: Date = new Date(),
    public createdAt: Date = new Date()
  ) {}
}
