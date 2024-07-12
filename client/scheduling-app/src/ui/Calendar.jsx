import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import toast from "react-hot-toast";
import formatDate, { formatTime } from "../helpers/dateFormat";

function Calendar({ onGetMeetingDate }) {
  const handleDateClick = (arg) => {
    let selecteedDate = arg.date;
    if (new Date(selecteedDate) < new Date()) {
      toast.error("You cannot book a meeting in the past");
    } else {
      onGetMeetingDate(arg.dateStr);
      toast.success(
        "Slot available on " +
          formatDate(arg.dateStr) +
          " at " +
          formatTime(arg.dateStr),
      );
    }
  };

  return (
    <>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin,
          googleCalendarPlugin,
        ]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          right: "dayGridMonth,timeGridWeek,listWeek",
        }}
        googleCalendarApiKey="<KEY>"
        weekNumberCalculation="ISO"
        weekNumbers={true}
        firstDay={0} // Start the week from Sunday
        slotMinTime="08:30:00" // Start time (8 AM)
        slotMaxTime="17:30:00" // End time (5:30 PM)
        slotDuration="00:30:00" // 30-minute intervals
        height="auto"
        contentHeight={500}
        dateClick={(arg) => {
          handleDateClick(arg);
        }}
        hiddenDays={[5, 6]}
        events={{
          googleCalendarId: "<EMAIL>",
        }}
        editable={true}
        eventClick={(arg) => {
          arg.jsEvent.preventDefault(),
            toast.error("Please Select Another time Slot");
        }}
      />
    </>
  );
}

export default Calendar;
