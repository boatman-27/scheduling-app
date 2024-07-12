import { useParams } from "react-router-dom";
import BookingItem from "./BookingItem";

function BookingTable({ bookings }) {
  const { studentId } = useParams();
  return (
    <div className="relative mx-auto mt-10 max-w-6xl overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        Showing {bookings.length} requested meetings for student: {studentId}
      </h1>
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-2 text-center">
              Meeting Title
            </th>
            <th scope="col" className="px-4 py-2 text-center">
              Meeting Date
            </th>
            <th scope="col" className="px-4 py-2 text-center">
              Meeting Time
            </th>
            <th scope="col" className="px-4 py-2 text-center">
              Duration
            </th>
            <th scope="col" className="px-4 py-2 text-center">
              Meeting Ending Time
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking) => (
            <BookingItem booking={booking} key={booking.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingTable;
