import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const checkInAttendee = async (
  qrCode: string
) => {
  const response = await api.post(
    "/check-in",
    { qrCode }
  );

  return response.data;
};

export const getAttendeeStatus = async (
  qrCode: string
) => {
  const response = await api.get(
    `/attendees/${qrCode}`
  );

  return response.data;
};