import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const checkInAttendee = async (
  qrCode: string
) => {
  const response = await axios.post(
    `${API_URL}/check-in`,
    {
      qrCode,
    }
  );

  return response.data;
};

export const getAttendeeStatus = async (
  qrCode: string
) => {
  const response = await axios.get(
    `${API_URL}/attendees/${qrCode}`
  );

  return response.data;
};