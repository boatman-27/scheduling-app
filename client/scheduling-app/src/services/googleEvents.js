import CustomStore from "devextreme/cjs/data/custom_store.js";
import { calculateEndingTime } from "../helpers/availableTimes";
import dotenv from "dotenv";
dotenv.config();

const getCalendarEvents = async (_, requestOptions) => {
  const GOOGLE_CALENDAR_URL = process.env.CALENDAR_URL;
  const CALENDAR_ID = process.env.CALENDAR_ID;
  const PUBLIC_KEY = process.env.PUBLIC_KEY;
  const dataUrl = [
    GOOGLE_CALENDAR_URL,
    CALENDAR_ID,
    "/events?key=",
    PUBLIC_KEY,
  ].join("");
  const response = await fetch(dataUrl, requestOptions);
  const data = await response.json();
  return data.items;
};

const dataSource = new CustomStore({
  load: (options) => getCalendarEvents(options, { showDeleted: false }),
});

const loadEvents = async () => {
  try {
    const events = await dataSource.load();
    return events;
  } catch (error) {
    console.error("Error loading events:", error);
    return [];
  }
};

export const events = await loadEvents();

export const createMeetingLink = (
  date,
  time,
  duration,
  title,
  location = "GUtech",
) => {
  const startDate = `${date.split("-").reverse().join("")}T${time.replace(":", "")}00`;
  const endDate = `${date.split("-").reverse().join("")}T${calculateEndingTime(
    time,
    duration,
  ).replace(":", "")}00`;

  const meetingLink = `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${startDate}/${endDate}&ctz=Asia/Muscat&text=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}`;

  return meetingLink;
};
