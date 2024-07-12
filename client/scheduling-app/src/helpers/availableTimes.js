import { formatTime } from "./dateFormat";

export const generateTimes = () => {
  const times = [];
  const start = new Date();
  start.setHours(8, 30, 0, 0);

  while (
    start.getHours() < 17 ||
    (start.getHours() === 17 && start.getMinutes() === 0)
  ) {
    times.push(new Date(start));
    start.setMinutes(start.getMinutes() + 30);
  }
  return times;
};

export const filterUnavailableTimes = (times, filteredEvents, selectedDate) => {
  const selectedEvents = filteredEvents.filter((event) => {
    return event.startDate === selectedDate;
  });

  const unavailableIntervals = selectedEvents.map((event) => ({
    startTime: event.startTime,
    endTime: event.endTime,
  }));

  const isTimeAvailable = (time) => {
    return !unavailableIntervals.some(({ startTime, endTime }) => {
      const formattedTime = String(formatTime(time));
      return formattedTime >= startTime && formattedTime < endTime;
    });
  };

  const available = times.filter(isTimeAvailable).map(formatTime);
  return available;
};

export const calculateEndingTime = (time, duration) => {
  const [hours, minutes] = time.split(":").map(Number);
  const startDate = new Date();
  startDate.setHours(hours, minutes, 0, 0);
  const endDate = new Date(startDate);

  const [durationMinutes, additionalText] = duration.split(" ");
  const durationHours = Number(durationMinutes) / 60;
  const durationMilliseconds = durationHours * 60 * 60 * 1000;
  endDate.setTime(endDate.getTime() + durationMilliseconds);

  const endHours = endDate.getHours();
  const endMinutes = endDate.getMinutes();
  const formattedEndHours = String(endHours).padStart(2, "0");
  const formattedEndMinutes = String(endMinutes).padStart(2, "0");

  return `${formattedEndHours}:${formattedEndMinutes}`;
};

export const changeDateFormat = (date) => {
  const [day, month, year] = date.split("-");
  return `${year}-${month}-${day}`;
};

export const toISO8601 = (date, time) => {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  const dateObj = new Date(year, month - 1, day, hours, minutes);

  const formattedDate =
    dateObj.getFullYear().toString() +
    String(dateObj.getMonth() + 1).padStart(2, "0") +
    String(dateObj.getDate()).padStart(2, "0") +
    "T" +
    String(dateObj.getHours()).padStart(2, "0") +
    String(dateObj.getMinutes()).padStart(2, "0") +
    String(dateObj.getSeconds()).padStart(2, "0");

  return formattedDate;
};
