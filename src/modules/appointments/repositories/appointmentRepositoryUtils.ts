interface Appointment {
  startTime: Date;
  duration: number;
}

interface Slot {
  start: Date;
  end: Date;
}

export const getUnavailableSlots = (appointments: Appointment[]): Slot[] =>
  appointments.map((appointment) => {
    const startTime = appointment.startTime.getTime();
    const duration = appointment.duration * 60000;

    return {
      start: new Date(startTime),
      end: new Date(startTime + duration),
    };
  });

export const getAvailableSlots = (
  start: Date,
  end: Date,
  unavailableSlots: Slot[]
): Slot[] => {
  const slotsTemplate = [
    {
      start,
      end: unavailableSlots[0].start,
    },
    ...unavailableSlots,
    {
      start: unavailableSlots[unavailableSlots.length - 1].end,
      end,
    },
  ];

  return slotsTemplate
    .reduce((acc, slot, i, slots) => {
      const isLast = i === slots.length - 1;
      const nextSlot = slots[i + 1];

      if (!isLast) {
        acc.push({ start: slot.end, end: nextSlot.start });
      } else {
        acc.push({ start: slot.start, end });
      }

      return acc;
    }, [] as Slot[])
    .filter(({ start, end }) => start.getTime() !== end.getTime());
};

const getSlots = (start: Date, end: Date, serviceTime: number): Slot[] => {
  const slots: Slot[] = [];
  const endTime = new Date(end.getTime());
  let currentTime = new Date(start.getTime());

  while (currentTime < endTime) {
    slots.push({
      start: currentTime,
      end: new Date(currentTime.getTime() + serviceTime * 60000),
    });
    currentTime = new Date(currentTime.getTime() + serviceTime * 60000);
  }

  if (currentTime > endTime) {
    slots.pop();
  }

  return slots;
};

export const getSlotsForService = (
  startDate: Date,
  endDate: Date,
  unavailableSlots: Slot[],
  serviceTime: number
) =>
  getAvailableSlots(startDate, endDate, unavailableSlots).reduce(
    (acc, { start, end }) => [...acc, ...getSlots(start, end, serviceTime)],
    [] as Slot[]
  );
