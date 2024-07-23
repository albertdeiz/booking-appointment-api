export class Service {
  constructor(
    public id: number,
    public name: string,
    public duration: number, // Duration in minutes
    public description?: string,
    public createdAt: Date = new Date()
  ) {}
}
