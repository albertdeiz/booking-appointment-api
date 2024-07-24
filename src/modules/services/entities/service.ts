export class Service {
  constructor(
    public id: number,
    public name: string,
    public duration: number, // Duration in minutes
    public description?: string,
    public updatedAt: Date = new Date(),
    public createdAt: Date = new Date()
  ) {}
}
