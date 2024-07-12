import CustomStore from "devextreme/cjs/data/custom_store.js";
import { calculateEndingTime, toISO8601 } from "../helpers/availableTimes";

const getCalendarEvents = async (_, requestOptions) => {
  const GOOGLE_CALENDAR_URL =
    "https://www.googleapis.com/calendar/v3/calendars/";
  const CALENDAR_ID =
    "e1be86b12488bfe7946f6355e1ea1a6862f81aec2c7bbfbd47e6cdf65b8e9226@group.calendar.google.com";
  const PUBLIC_KEY = "AIzaSyCqqupLuKZmoJCqGMInY39sGToxEG_TU7w";
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
