import { prismaMock } from "../../../../infrastructure/database/test/singleton";
import { Appointment } from "../../entities/appointment";
import { AppointmentRepositoryImpl } from "../appointmentRepositoryImpl";
import { Appointment as PrismaAppointment } from "@prisma/client";

describe("AppointmentRepositoryImpl - tests", () => {
  let repository: AppointmentRepositoryImpl;

  beforeAll(() => {
    repository = new AppointmentRepositoryImpl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an appointment", async () => {
    const appointment = new Appointment(
      1,
      1,
      1,
      1,
      new Date(),
      60,
      "CONFIRMED",
      15
    );

    const prismaAppointment = {
      id: 1,
      userId: 1,
      providerId: 1,
      serviceId: 1,
      startTime: appointment.startTime,
      duration: 60,
      status: "CONFIRMED",
      bufferTime: 15,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    };

    prismaMock.appointment.create.mockResolvedValue(prismaAppointment);

    const result = await repository.create(appointment);

    expect(result).toEqual(appointment);

    expect(prismaMock.appointment.create).toHaveBeenCalledWith({
      data: {
        userId: 1,
        providerId: 1,
        serviceId: 1,
        startTime: appointment.startTime,
        duration: 60,
        status: "CONFIRMED",
        bufferTime: 15,
      },
    });
  });

  it("should find available slots for a provider on a specific date", async () => {
    const date = new Date("2023-07-24");

    const appointments: PrismaAppointment[] = [
      {
        id: 1,
        userId: 1,
        providerId: 1,
        serviceId: 1,
        startTime: new Date(date.setHours(10, 0, 0, 0)),
        duration: 60,
        status: "CONFIRMED",
        bufferTime: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 1,
        providerId: 1,
        serviceId: 1,
        startTime: new Date(date.setHours(13, 0, 0, 0)),
        duration: 60,
        status: "CONFIRMED",
        bufferTime: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    prismaMock.appointment.findMany.mockResolvedValue(appointments);

    const result = await repository.findAvailableSlots(1, date);

    expect(result).toHaveLength(2);

    expect(prismaMock.appointment.findMany).toHaveBeenCalledWith({
      where: {
        providerId: 1,
        startTime: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(23, 59, 59, 999)),
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });
  });

  it("should find an appointment by id", async () => {
    const appointment: PrismaAppointment = {
      id: 1,
      userId: 1,
      providerId: 1,
      serviceId: 1,
      startTime: new Date(),
      duration: 60,
      status: "CONFIRMED",
      bufferTime: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.appointment.findUnique.mockResolvedValue(appointment);

    const result = await repository.findById(1);

    expect(result).toEqual(
      new Appointment(
        appointment.id,
        appointment.userId,
        appointment.providerId,
        appointment.serviceId,
        appointment.startTime,
        appointment.duration,
        appointment.status,
        appointment.bufferTime,
        appointment.updatedAt,
        appointment.createdAt
      )
    );
    expect(prismaMock.appointment.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it("should return null if appointment not found by id", async () => {
    const mockId = 999;
    prismaMock.appointment.findUnique.mockResolvedValue(null);

    const result = await repository.findById(mockId);

    expect(result).toBeNull();

    expect(prismaMock.appointment.findUnique).toHaveBeenCalledWith({
      where: { id: mockId },
    });
  });

  it("should update an appointment", async () => {
    const appointment = new Appointment(
      1,
      1,
      1,
      1,
      new Date(),
      60,
      "CONFIRMED",
      15
    );
    const updatedAppointment: PrismaAppointment = {
      id: 1,
      userId: 1,
      providerId: 1,
      serviceId: 1,
      startTime: appointment.startTime,
      duration: 60,
      status: "CONFIRMED",
      bufferTime: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.appointment.update.mockResolvedValue(updatedAppointment);

    const result = await repository.update(appointment);

    expect(result).toEqual(
      new Appointment(
        updatedAppointment.id,
        updatedAppointment.userId,
        updatedAppointment.providerId,
        updatedAppointment.serviceId,
        updatedAppointment.startTime,
        updatedAppointment.duration,
        updatedAppointment.status,
        updatedAppointment.bufferTime,
        updatedAppointment.updatedAt,
        updatedAppointment.createdAt
      )
    );

    expect(prismaMock.appointment.update).toHaveBeenCalledWith({
      where: { id: appointment.id },
      data: {
        userId: appointment.userId,
        providerId: appointment.providerId,
        serviceId: appointment.serviceId,
        startTime: appointment.startTime,
        duration: appointment.duration,
        status: appointment.status,
        bufferTime: appointment.bufferTime,
      },
    });
  });

  it("should delete an appointment", async () => {
    prismaMock.appointment.delete.mockResolvedValue({} as PrismaAppointment);

    await repository.delete(1);

    expect(prismaMock.appointment.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
