export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public phone?: string,
    public updatedAt: Date = new Date(),
    public createdAt: Date = new Date()
  ) {}
}
