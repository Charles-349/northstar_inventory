import type { Attendee } from "../types/attendee";

interface Props {
  attendee: Attendee;
}

export default function AttendeeCard({
  attendee,
}: Props) {
  return (
    <div className="border p-4 rounded mt-4">
      <h2 className="font-bold">
        {attendee.fullName}
      </h2>

      <p>QR: {attendee.qrCode}</p>

      <p>Status: {attendee.status}</p>
    </div>
  );
}