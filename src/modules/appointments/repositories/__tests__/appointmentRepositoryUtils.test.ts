import { getAvailableSlots, getSlotsForService, getUnavailableSlots } from "../appointmentRepositoryUtils";

interface Appointment {
  startTime: Date;
  duration: number;
}

const date = new Date();

const appointmentsMock: Appointment[] = [
  {
    startTime: new Date(date.setHours(9, 0, 0, 0)),
    duration: 45,
  },
  {
    startTime: new Date(date.setHours(10, 30, 0, 0)),
    duration: 45,
  },
  {
    startTime: new Date(date.setHours(12, 0, 0, 0)),
    duration: 45,
  },
];

const startHourMock = new Date(date.setHours(9, 0, 0, 0));
const endHourMock = new Date(date.setHours(16, 0, 0, 0));

describe("appointmentRepositoryUtils.test - tests", () => {
  it("should return unavailable time slots", async () => {
    const unavailableSlots = getUnavailableSlots(appointmentsMock);

    expect(unavailableSlots).toMatchObject([
      { start: new Date(date.setHours(9, 0, 0, 0)), end: new Date(date.setHours(9, 45, 0, 0)) },
      { start: new Date(date.setHours(10, 30, 0, 0)), end: new Date(date.setHours(11, 15, 0, 0)) },
      { start: new Date(date.setHours(12, 0, 0, 0)), end: new Date(date.setHours(12, 45, 0, 0)) }
    ]);
  });

  it("should return available time slots from given appointments", async () => {
    const unavailableSlots = getUnavailableSlots(appointmentsMock);

    const availableSlots = getAvailableSlots(startHourMock, endHourMock, unavailableSlots);

    expect(availableSlots).toMatchObject([
      { start: new Date(date.setHours(9, 45, 0, 0)), end: new Date(date.setHours(10, 30, 0, 0)) },
      { start: new Date(date.setHours(11, 15, 0, 0)), end: new Date(date.setHours(12, 0, 0, 0)) },
      { start: new Date(date.setHours(12, 45, 0, 0)), end: new Date(date.setHours(16, 0, 0, 0)) }
    ]);
  });

  it("should return available time slots for a specific service time", async () => {
    const serviceTime = 30;
    const unavailableSlots = getUnavailableSlots(appointmentsMock);

    const slotsForService = getSlotsForService(startHourMock, endHourMock, unavailableSlots, serviceTime);

    expect(slotsForService).toMatchObject([
      { start: new Date(date.setHours(9, 45, 0, 0)), end: new Date(date.setHours(10, 15, 0, 0)) },
      { start: new Date(date.setHours(11, 15, 0, 0)), end: new Date(date.setHours(11, 45, 0, 0)) },
      { start: new Date(date.setHours(12, 45, 0, 0)), end: new Date(date.setHours(13, 15, 0, 0)) },
      { start: new Date(date.setHours(13, 15, 0, 0)), end: new Date(date.setHours(13, 45, 0, 0)) },
      { start: new Date(date.setHours(13, 45, 0, 0)), end: new Date(date.setHours(14, 15, 0, 0)) },
      { start: new Date(date.setHours(14, 15, 0, 0)), end: new Date(date.setHours(14, 45, 0, 0)) },
      { start: new Date(date.setHours(14, 45, 0, 0)), end: new Date(date.setHours(15, 15, 0, 0)) },
      { start: new Date(date.setHours(15, 15, 0, 0)), end: new Date(date.setHours(15, 45, 0, 0)) },
    ]);
  });
});
