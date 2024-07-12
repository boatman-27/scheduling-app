import { events } from "../services/googleEvents.js";
import formatDate, { formatTime } from "./dateFormat.js";

const filterEvents = (events) => {
  return events.map((event) => ({
    startDate: formatDate(event.start.dateTime),
    endDate: formatDate(event.end.dateTime),
    startTime: formatTime(event.start.dateTime),
    endTime: formatTime(event.end.dateTime),
    title: event.summary,
  }));
};
const filteredEvents = filterEvents(events);
export default filteredEvents;
