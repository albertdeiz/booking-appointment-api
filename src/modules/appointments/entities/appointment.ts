export class Appointment {
  constructor(
    public id: number,
    public userId: number,
    public providerId: number,
    public serviceId: number,
    public startTime: Date,
    public duration: number,
    public status: string,
    public bufferTime: number
  ) {}
}
