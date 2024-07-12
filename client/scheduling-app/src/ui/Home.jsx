import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import Calendar from "./Calendar";
import BookMeeting from "../features/meetings/BookMeeting";

function Home() {
  const { accountStatus, user } = useOutletContext();
  const [showForm, setShowForm] = useState(false);
  const [meetingDate, setMeetingDate] = useState(null);

  const handleMeeting = (date) => {
    accountStatus
      ? (setShowForm(true), setMeetingDate(date))
      : toast.error("Please login to book a meeting");
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="mt-3 w-full sm:w-[40%] md:w-[50%] lg:w-[60%] xl:w-[70%] 2xl:w-[80%]">
        <Calendar onGetMeetingDate={handleMeeting} />
      </div>
      <div className="mt-3 flex w-full flex-col items-center justify-center">
        {showForm && (
          <div className="mt-3 w-full sm:w-[40%] md:w-[50%] lg:w-[60%] xl:w-[70%] 2xl:w-[80%]">
            <BookMeeting requestedDate={meetingDate} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
