import { Service } from "../../services/entities/service";

export class Provider {
  constructor(
    public id: number,
    public name: string,
    public services: Service[], // List of Service instances
    public createdAt: Date = new Date()
  ) {}
}
