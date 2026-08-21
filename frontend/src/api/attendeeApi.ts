import axios from "axios";

const API_URL = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL,
});

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