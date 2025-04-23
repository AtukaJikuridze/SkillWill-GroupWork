export const generateTimeSlots = (startHour: number, endHour: number) => {
  const slots = [];
  for (let time = startHour; time < endHour; time += 0.5) {
    const hours = Math.floor(time);
    const minutes = time % 1 === 0 ? "00" : "30";
    const timeStr = `${hours.toString().padStart(2, "0")}:${minutes}`;
    slots.push(timeStr);
  }
  return slots;
};
