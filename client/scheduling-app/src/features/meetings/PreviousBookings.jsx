import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPreviousBookedMeetings } from "../../services/apiBooking";
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";
import BookingTable from "./BookingTable";

function PreviousBookings() {
  const { studentId } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["getPreviousBookings", studentId],
    queryFn: getPreviousBookedMeetings,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="mt-5 flex items-center justify-center">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          No previous bookings
        </h2>
      </div>
    );
  }

  return (
    <div>
      <BookingTable bookings={data} />
    </div>
  );
}

export default PreviousBookings;
