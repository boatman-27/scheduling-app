import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "add-to-calendar-button";

import BookMeetingForm from "./BookMeetingForm";

import filteredEvents from "../../helpers/filterEvents";
import formatDate, { formatTime } from "../../helpers/dateFormat";
import {
  generateTimes,
  filterUnavailableTimes,
  calculateEndingTime,
  changeDateFormat,
} from "../../helpers/availableTimes.js";
import { bookMeeting } from "../../services/apiBooking.js";

function BookMeeting({ requestedDate }) {
  const { register, handleSubmit, reset } = useForm();

  const [requestedMeeting, setRequestedMeeting] = useState(null);
  const { mutate } = useMutation({
    mutationFn: ({ data, user }) => {
      bookMeeting(data, user);
    },
    onSuccess: () => {
      toast.success("Meeting booked successfully!");
      reset();
    },
    onError: (error) => {
      toast.error("Failed to book the meeting.", error);
    },
  });

  const { accountStatus, user = {} } = useOutletContext();
  const date = formatDate(requestedDate);
  const time = formatTime(requestedDate);

  const onSubmit = (data) => {
    mutate({ data, user });
    setRequestedMeeting(data);
  };

  const onError = (errors) => {
    Object.keys(errors).forEach((key) => {
      toast.error(errors[key].message);
    });
  };

  const times = generateTimes();
  const availableTimes = filterUnavailableTimes(times, filteredEvents, date);

  return (
    <div className="mb-4 flex items-center justify-center">
      <div className="relative w-full rounded-lg bg-white p-4 shadow sm:w-[450px] sm:p-5 md:w-[560px] lg:w-[700px] dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-center rounded-t border-b pb-4 sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Book a meeting
          </h3>
        </div>
        <BookMeetingForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          onError={onError}
          pickedDate={date}
          pickedTime={time}
          availableTimes={availableTimes}
          user={user}
          requestedMeeting={requestedMeeting}
        />
        <div className="mt-4 flex items-center justify-center">
          {requestedMeeting && (
            <add-to-calendar-button
              name={requestedMeeting.title}
              label="Add to your Google Calendar"
              options="Google"
              location="GUtech"
              startDate={changeDateFormat(requestedMeeting.date)}
              endDate={changeDateFormat(requestedMeeting.date)}
              startTime={requestedMeeting.time}
              endTime={calculateEndingTime(
                requestedMeeting.time,
                requestedMeeting.duration,
              )}
              timeZone="Asia/Muscat"
            ></add-to-calendar-button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookMeeting;
