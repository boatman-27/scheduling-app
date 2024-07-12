import emailjs from "emailjs-com";
import dotenv from "dotenv";
dotenv.config();

import { calculateEndingTime } from "../helpers/availableTimes";
import { createMeetingLink } from "../services/googleEvents";

const SERVICE_ID = process.env.SERVICE_ID;
const TEMPLATE_ID = process.env.TEMPLATE_ID;
const API_KEY = process.env.API_KEY;

const BASE_URL = "http://localhost:3000/";
const BASE_URL2 = "https://scheduling-app-backend.vercel.app/account";

export async function bookMeeting(meetingData, user) {
  // sendMeetingInfo(meetingData, user);
  console.log("bookMeeting", meetingData, user);
  try {
    const res = await fetch(`${BASE_URL}meetings/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meetingData),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// services/apiBooking.js
export async function getPreviousBookedMeetings({ queryKey }) {
  const [, studentId] = queryKey;
  try {
    const res = await fetch(`${BASE_URL}meetings/booked/${studentId}`, {
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }
    const data = await res.json();
    return data.meetings;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const sendMeetingInfo = (requestedMeeting, user) => {
  console.log(requestedMeeting, user);
  const { fname, lname } = user;
  const { studentId, date, time, duration, title } = requestedMeeting;
  const template_params = {
    studentId,
    fName: fname,
    lName: lname,
    date,
    time,
    ending_time: calculateEndingTime(time, duration),
    meeting_link: createMeetingLink(date, time, duration, title),
  };
  emailjs.send(SERVICE_ID, TEMPLATE_ID, template_params, API_KEY).then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text);
    },
    (error) => {
      console.log("FAILED...", error);
    },
  );
};
