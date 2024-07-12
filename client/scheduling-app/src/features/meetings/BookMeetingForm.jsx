import { useState } from "react";

function BookMeetingForm({
  register,
  handleSubmit,
  onSubmit,
  onError,
  pickedDate,
  pickedTime,
  availableTimes,
  user,
}) {
  const { id, email, studentid } = user;
  const [date, setDate] = useState(pickedDate);
  const [time, setTime] = useState(pickedTime);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit, onError)}>
      <input
        className="hidden"
        type="number"
        name="id"
        id="id"
        value={id}
        {...register("id")}
      />
      <input
        className="hidden"
        type="email"
        name="email"
        id="email"
        value={email}
        {...register("email")}
      />
      <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
        <div>
          <label
            htmlFor="studentId"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your ID
          </label>
          <input
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            type="text"
            name="studentId"
            id="studentId"
            value={studentid}
            {...register("studentId")}
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            type="text"
            name="title"
            id="title"
            placeholder="Meeting Title"
            {...register("title", {
              required: "Please enter a title for your meeting.",
            })}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-3">
        <div>
          <label
            htmlFor="date"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <div className="relative max-w-sm">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              id="datepicker-autohide"
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Select date"
              value={date}
              {...register("date", {
                required: "Please pick a date.",
                onChange: (e) => {
                  setDate(e.target.value);
                },
              })}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="time"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Time
          </label>
          <select
            id="time"
            name="time"
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={time}
            {...register("time", {
              required: "Please select a time.",
              onChange: (e) => {
                setTime(e.target.value);
              },
            })}
          >
            <option value="">{time}</option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="duration"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Duration
          </label>
          <select
            id="duration"
            name="duration"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            {...register("duration", {
              required: "Please select a duration.",
            })}
          >
            <option>30 Minutes</option>
            <option>60 Minutes (1 Hour)</option>
            <option>90 Minutes (1 Hour 30 Minutes)</option>
            <option>120 Minutes (2 Hours)</option>
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Meeting Description
        </label>
        <textarea
          id="message"
          rows="4"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Optional description"
          {...register("message")}
        ></textarea>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Confirm Meeting
        </button>
      </div>
    </form>
  );
}

export default BookMeetingForm;
