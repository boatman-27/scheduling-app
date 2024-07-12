import formatDate from "../../helpers/dateFormat";

function BookingItem({ booking }) {
  const { id, meeting_date, start_time, duration, end_time, title } = booking;
  return (
    <tr>
      <td className="px-4 py-2 text-center text-yellow-300">{title}</td>
      <td className="px-4 py-2 text-center text-yellow-300">
        {formatDate(meeting_date)}
      </td>
      <td className="px-4 py-2 text-center text-yellow-300">{start_time}</td>
      <td className="px-4 py-2 text-center text-yellow-300">
        {duration} Minutes
      </td>
      <td className="px-4 py-2 text-center text-yellow-300">{end_time}</td>
    </tr>
  );
}

export default BookingItem;
